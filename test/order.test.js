const expect = require("chai").expect;
const sinon = require("sinon");
const db = require("../models/index").sequelize;
const jwt = require("jsonwebtoken");
const client = require("../config/redis");
const orderService = require("../service/orderService");
const User = require("../models").User;
const Product = require("../models").Product;
const Order = require("../models").Order;
const transporter = require("../config/nodeMailer");
const ecpay = require("../config/ecpay");
const mockID = "00000000-0000-0000-0000-000000000000";
let req;
let res;
let product;
let carts;
let newOrder;
let currOrder;

describe("Order service", () => {
    before("stub config", () => {
        sinon.stub(jwt, "sign");
        sinon.stub(db, "transaction");
        sinon.stub(transporter, "sendMail");
        sinon.stub(ecpay.payment_client, "aio_check_out_credit_onetime").returns("test");
        sinon.stub(client, "expire");
        sinon.stub(client, "hset");
        sinon.stub(client, "setex");
        sinon.stub(client, "get");
        carts = sinon.stub(client, "hgetall");
        user = sinon.stub(User, "findByPk");
        product = sinon.stub(Product, "findByPk");
        newOrder = sinon.stub(Order, "create");
        currOrder = sinon.stub(Order, "findOne");
        sinon.stub(Order, "findByPk").returns({
            orderNumber: "test",
            address: "test",
            number: "test",
            orderSum: 0,
            paymentStatus: 2,
            getProducts: () => {
                return [{
                    name: "test",
                    price: 1,
                    orderProduct: {
                        quantity: 1
                    }
                }]
            },
            update: () => {},
            getUser: () => {
                return "test"
            }
        });
    });

    it("should return paymentPage for ECpay payment page.", async () => {
        req = {
            params: {
                orderNumber: "000000000000000"
            },
            headers: {
                cookie: ""
            }
        };

        res = await orderService.getPayment(req, res, () => {});
        expect(res).to.equal("test");
    });

    it("should return page title and order information from ECpay for payment result page.", async () => {
        const mockTradeDate = new Date();
        const mockTradeAmt = 100;
        const mockOrderNumber = "000000000000000";
        req = {
            body: {
                MerchantTradeNo: `${mockOrderNumber}LU000`,
                RtnMsg: "Succeeded",
                TradeDate: mockTradeDate,
                TradeAmt: mockTradeAmt
            },
            headers: {
                cookie: ""
            }
        };

        res = await orderService.getPaymentResult(req, res, () => {});
        expect(res.pageTitle).to.equal(`Lullabuy || Payment result for: ${mockOrderNumber}`);
        expect(res.orderNumber).to.equal(mockOrderNumber);
        expect(res.tradeDate).to.equal(mockTradeDate);
        expect(res.tradeAmt).to.equal(mockTradeAmt);
        expect(res.rtnMsg).to.equal("Succeeded");
        expect(res.tradeMode).to.equal(true);
        expect(res.user).to.equal("test");
    });
    context("Get order details:", () => {

        specify("should return page title and order information from order detail page.", async () => {
            const mockOrderNumber = "000000000000000";
            req = {
                params: {
                    orderNumber: mockOrderNumber
                },
                headers: {
                    cookie: ""
                }
            };
            currOrder.returns({
                orderSum: 100,
                getProducts: () => {
                    return []
                }
            });

            res = await orderService.getOrderDetails(req, res, () => {});
            expect(res.pageTitle).to.equal(`Lullabuy || Order details: ${mockOrderNumber}`);
            expect(res.order).to.be.an("object");
            expect(res.orderSum).to.equal(100);
            expect(res.productDetails).to.be.an("array");
        });

        specify("should return page title and order information from order detail page.", async () => {
            const mockOrderNumber = "000000000000000";
            req = {
                params: {
                    orderNumber: mockOrderNumber
                },
                headers: {
                    cookie: ""
                }
            };
            currOrder.returns();


            res = await orderService.getOrderDetails(req, res, (err) => {
                expect(err).to.be.an("error");
                expect(err.statusCode).to.equal(404);
                expect(err.data.pageTitle).to.equal("Order not found!");
            });
        });

    });

    it("should receive ECpay response and return `1|OK` to ECpay server if payment is completed.", async () => {
        req = {
            body: {
                MerchantTradeNo: "000000000000000LU000",
                RtnCode: 1,
                SimulatePaid: 1
            },
            headers: {
                cookie: ""
            }
        };

        res = await orderService.paymentCallback(req, res, () => {});
        expect(res).to.equal("1|OK");
    });

    context("Create order:", () => {
        specify("should create a new order (visitor), then return status: true and order number.", async () => {
            req = {
                body: {
                    firstName: "test",
                    lastName: "test",
                    email: "test",
                    number: "test",
                    address: "test"
                },
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            product.returns({
                stock: 1,
                price: 1
            });
            carts.returns({
                "test": 1
            });

            newOrder.returns({
                setUser: () => {},
                addProducts: () => {}
            });

            res = await orderService.createOrder(req, res, () => {});
            expect(res.status).to.be.true;
            expect(res.orderNumber).to.be.a("number");
        });

        specify("should create a new order (user), then return status: true and order number.", async () => {
            req = {
                body: {
                    firstName: "test",
                    lastName: "test",
                    email: "test",
                    number: "test",
                    address: "test",
                    saveCheck: true
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: `${mockID}`
                }
            };
            product.returns({
                stock: 1,
                price: 1
            });
            carts.returns({
                "test": 1
            });
            newOrder.returns({
                setUser: () => {},
                addProducts: () => {}
            });
            user.returns({
                addOrders: () => {},
                update: () => {}
            });

            res = await orderService.createOrder(req, res, () => {});
            expect(res.status).to.be.true;
            expect(res.orderNumber).to.be.a("number");
        });
    });

    context("Cancel order:", () => {
        specify("should find and cancel the order, then return status: true.", async () => {
            req = {
                params: {
                    orderNumber: "test"
                }
            };
            currOrder.returns({
                update: () => {
                    return true;
                }
            });

            res = await orderService.cancelOrder(req, res, () => {});
            expect(res.status).to.be.true;
        });

        specify("should return error due to non-existent order.", async () => {
            req = {
                params: {
                    orderNumber: "test"
                }
            };
            currOrder.returns();

            res = await orderService.cancelOrder(req, res, (err) => {
                expect(err).to.be.an("error");
                expect(err.statusCode).to.equal(404);
                expect(err.data.pageTitle).to.equal("Order not found!");
            });
        });


        after("restore stub function", () => {
            jwt.sign.restore();
            db.transaction.restore();
            transporter.sendMail.restore();
            client.expire.restore();
            client.get.restore();
            client.hset.restore();
            client.setex.restore();
            client.hgetall.restore();
            Order.create.restore();
            Order.findByPk.restore();
            Order.findOne.restore();
            User.findByPk.restore();
            Product.findByPk.restore();
            ecpay.payment_client.aio_check_out_credit_onetime.restore();
        })
    });
});