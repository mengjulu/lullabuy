const User = require("../models").User;
const Order = require("../models").Order;
const bcrypt = require("bcrypt");
const errorResponse = require("../config/error");

module.exports = {
    getWishlist: async (req, res, next) => {

        const userID = req.user.id;
        const user = await User.findByPk(userID);
        const wishlists = await user.getProducts({
            raw: true
        });

        return {
            pageTitle: "Lullabuy || Wishlist",
            wishlists: wishlists
        };


    },
    getUserOrders: async (req, res, next) => {
        const userID = req.user.id;
        const orders = await Order.findAll({
            where: {
                userId: userID
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });

        return {
            pageTitle: "Lullabuy || Orders",
            orders: orders
        };
    },

    getUserOrderDetails: async (req, res, next) => {

        const orderNumber = req.params.orderNumber;
        const userId = req.user.id;
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber,
                userId: userId
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

    getSettings: async (req, res, next) => {

        const userID = req.user.id;
        const adminStatus = req.user.isAdmin;
        const user = await User.findByPk(userID, {
            raw: true,
            isAdmin: adminStatus
        });

        return {
            pageTitle: "Lullabuy || Settings",
            user: user
        };
    },

    getPassword: async (req, res, next) => {

        const userID = req.user.id;
        const adminStatus = req.user.isAdmin;
        const user = await User.findByPk(userID, {
            raw: true,
            isAdmin: adminStatus
        });

        return {
            pageTitle: "Lullabuy || Change password",
            user: user
        };
    },

    editWishList: async (req, res, next) => {

        const productID = req.body.productID;
        const userID = req.user.id;
        const user = await User.findByPk(userID);
        const existedProductCheck = await user.hasProducts(productID);
        existedProductCheck ? await user.removeProducts(productID) : await user.addProducts(productID);
        return {
            status: !existedProductCheck
        };
    },

    editPersonalInfo: async (req, res, next) => {
        const userID = req.user.id;
        const user = await User.findByPk(userID);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const number = req.body.number;
        const address = req.body.address;

        await user.update({
            firstName: firstName,
            lastName: lastName,
            number: number,
            address: address
        });

        return {
            status: true
        };
    },

    editPassword: async (req, res, next) => {

        const currentPwd = req.body.currentPwd;
        const newPwd = req.body.newPwd;
        const user = await User.findByPk(req.user.id);
        const pwdCheck = bcrypt.compareSync(currentPwd, user.password);

        if (!pwdCheck) {
            return {
                status: false,
                message: "The current password is incorrect, please try again."
            };
        } else if (currentPwd == newPwd) {
            return {
                status: false,
                message: "The current password is the same as the new password, please try again."
            };
        } else {
            await user.update({
                password: newPwd
            });

            return {
                status: true,
                message: "Password updated!"
            };
        };


    }
}