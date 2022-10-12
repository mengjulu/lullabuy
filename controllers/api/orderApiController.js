const { read, readSync } = require("fs");
const {
    createOrder,
    paymentCallback,
    cancelOrder
} = require("../../service/orderService");

module.exports = {

    checkout: async (req, res, next) => {
        try {
            const data = await createOrder(req, res, next);
            res.clearCookie("cartID");
            return res.status(201).json(data);

        } catch (err) {
            return next(err);
        }
    },

    paymentCallback: async (req, res, next) => {
        try {
            const response = await paymentCallback(req, res, next);
            return res.send(response);

        } catch (err) {
            return next(err);
        }
    },

    cancelOrder: async (req, res, next) => {
        try {
            const data = await cancelOrder(req, res, next);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    }
};