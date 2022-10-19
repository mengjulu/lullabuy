const Order = require("../models").Order;
const User = require("../models").User;
const db = require("../models/index").sequelize;
const client = require("../config/redis");
const {
    getCartInfo,
    getCartSum
} = require("../utils/cart");
const {
    getCartCookie
} = require("../utils/cookieParser");
const {
    sendOrderContentMail
} = require("../utils/nodeMailer/mailer");
const getECpayPage = require("../utils/ecpay");
const errorResponse = require("../config/error");
const randomValue = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

module.exports = {
    getPayment: async (req, res, next) => {
        const orderNumber = req.params.orderNumber;
        const order = await Order.findByPk(orderNumber);
        if (order.paymentStatus == 1) return next(new errorResponse(400, "Already paid!", {
            pageTitle: `Already paid!`,
            errorMessage: `This order has already paid.`
        }));
        const paymentPage = await getECpayPage(orderNumber);
        return paymentPage;
    },

    getPaymentResult: async (req, res, next) => {
        const MerchantTradeNo = req.body.MerchantTradeNo;
        const rtnMsg = req.body.RtnMsg;
        const tradeDate = req.body.TradeDate;
        const tradeAmt = Number(req.body.TradeAmt);
        const orderNumber = MerchantTradeNo.split("LU")[0];
        const order = await Order.findByPk(orderNumber);
        let user = await order.getUser();

        return {
            pageTitle: `Lullabuy || Payment result for: ${orderNumber}`,
            orderNumber: orderNumber,
            tradeDate: tradeDate,
            tradeAmt: tradeAmt,
            rtnMsg: rtnMsg,
            tradeMode: rtnMsg == "Succeeded" ? true : false,
            user: user
        };
    },

    getOrderDetails: async (req, res, next) => {
        const orderNumber = req.params.orderNumber;
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber
            }
        });

        if (!order) return next(new errorResponse(404, "Order not found!", {
            pageTitle: `Order not found!`,
            errorMessage: `Oops! Seems the order doesn’t exist.`
        }));

        const orderSum = order.orderSum;
        const productDetails = await order.getProducts({
            raw: true,
            joinTableAttributes: ["quantity"],
            paranoid: false
        });
        return {
            pageTitle: `Lullabuy || Order details: ${orderNumber}`,
            order: order,
            orderSum: orderSum,
            productDetails: productDetails
        };
    },

    paymentCallback: async (req, res, next) => {
        const MerchantTradeNo = req.body.MerchantTradeNo;
        const rtnCode = req.body.RtnCode == 1 ? true : false;
        const orderNumber = MerchantTradeNo.split("LU")[0];
        const order = await Order.findByPk(orderNumber);
        const orderSum = order.orderSum;
        let productDetails;
        // Reduce the stock of products if payment succeed
        if (rtnCode == "1") {
            await db.transaction(async (t) => {
                productDetails = await order.getProducts({
                    joinTableAttributes: ["quantity"],
                    paranoid: false,
                    transaction: t
                });
                await productDetails.forEach(async (p) => {
                    const soldAmount = p.orderProduct.quantity;
                    await p.decrement("stock", {
                        by: soldAmount,
                        transaction: t
                    });
                    //Remove the product cache
                    client.expire(p.id, 0);
                });

                // Update payment status of the order
                await order.update({
                    paymentStatus: 1,
                    transaction: t
                });
            })
            // Send order confirmation letter to the user
            sendOrderContentMail(order, orderSum, productDetails);
        };

        if (rtnCode == "1") return ("1|OK");
    },

    createOrder: async (req, res, next) => {
        const cartID = getCartCookie(req);
        const carts = await getCartInfo(cartID);
        const orderSum = await getCartSum(carts);
        const userID = req.user ? req.user.id : null;
        const orderNumber = randomValue(10, 99) + Date.now() + randomValue(10, 99);
        const saveCheck = req.body.saveCheck;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const number = req.body.number;
        const address = req.body.address;

        await db.transaction(async (t) => {

            // Create order
            const order = await Order.create({
                orderNumber: orderNumber,
                orderSum: orderSum,
                firstName: firstName,
                lastName: lastName,
                email: email,
                number: number,
                address: address
            }, {
                transaction: t
            });
            await order.setUser(userID, {
                transaction: t
            });
            // Add product and its quantity to the order
            for (let product of carts) {
                let productName = product[0];
                let productQty = product[1];
                await order.addProducts(productName.id, {
                    through: {
                        quantity: productQty
                    },
                    transaction: t
                })
            };
        });

        // Remove cart cache
        client.expire(cartID, 0);

        if (userID) {
            const user = await User.findByPk(userID);
            // Update user's information if save check equals true
            if (saveCheck) {
                await user.update({
                    firstName: firstName,
                    lastName: lastName,
                    number: number,
                    address: address
                });
            }
        };

        return {
            status: true,
            orderNumber: orderNumber
        };
    },

    cancelOrder: async (req, res, next) => {
        const orderNumber = req.params.orderNumber;
        // Only allows when the payment status is outstanding
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber,
                paymentStatus: 2
            }
        });

        if (!order) return next(new errorResponse(404, "Order not found!", {
            pageTitle: `Order not found!`,
            errorMessage: `Oops! Seems the order doesn’t exist.`
        }));

        cancelStatus = await order.update({
            paymentStatus: 3
        });

        return {
            status: true
        };
    }
};