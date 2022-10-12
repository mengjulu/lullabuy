const {
    editAdmin,
    createProduct,
    editProduct,
    deleteProduct,
    deleteOrder,
    resendOrderLetter
} = require("../../service/adminService");
const {
    cancelOrder
} = require("../../service/orderService");
const errorResponse = require("../../config/error");

module.exports = {

    editAdmin: async (req, res, next) => {
        try {
            const data = await editAdmin(req, res);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    },

    createProduct: async (req, res, next) => {
        try {

            const route = await createProduct(req, res, next);
            return res.redirect(route);

        } catch (err) {
            const error = err.name == "SequelizeUniqueConstraintError" ?
                new errorResponse(409, "The product name has existed.", {
                    pageTitle: `Something goes wrong!`,
                    errorMessage: `Oops! Seems The product name has existed.`
                }) : new Error(err);

            return next(error);
        }
    },

    editProduct: async (req, res, next) => {
        try {
            const route = await editProduct(req, res, next);
            return res.redirect(route);

        } catch (err) {
            const error = err.name == "SequelizeUniqueConstraintError" ?
                new errorResponse(409, "The product name has existed.", {
                    pageTitle: `Something goes wrong!`,
                    errorMessage: `Oops! Seems The product name has existed.`
                }) : new Error(err);

            return next(error);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const data = await deleteProduct(req, res, next);
            const statusCode = data.status ? 200 : 404;
            return res.status(statusCode).json(data);

        } catch (err) {
            return next(err);
        }
    },

    resendOrderLetter: async (req, res, next) => {
        try {
            const data = await resendOrderLetter(req, res, next);
            return res.status(202).json(data);

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
    },

    deleteOrder: async (req, res, next) => {
        try {
            const data = await deleteOrder(req, res, next);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    }
};