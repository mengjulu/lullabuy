const {
    getPayment,
    getPaymentResult,
    getOrderDetails
} = require("../../service/orderService");

module.exports = {

    getPayment: async (req, res, next) => {
        try {
            const data = await getPayment(req, res, next);
            return res.status(200).send(data);

        } catch (err) {
            return next(err);
        }
    },

    getPaymentResult: async (req, res, next) => {
        try {
            const data = await getPaymentResult(req, res, next);
            res.status(200).render("shop/paymentResult", data);

        } catch (err) {
            return next(err);
        }
    },

    getOrderDetails: async (req, res, next) => {
        try {
            const data = await getOrderDetails(req, res, next);
            return res.status(200).render("account/orderDetail", data);

        } catch (err) {
            return next(err);
        }
    }
};