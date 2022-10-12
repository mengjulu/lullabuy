const {
    addToCart,
    editCartProduct,
    deleteFromCart
} = require("../../service/cartService");

module.exports = {

    addToCart: async (req, res, next) => {
        try {
            const data = await addToCart(req, res, next);

            if (data.cartID) {
                res.cookie("cartID", data.cartID, {
                    // Expire after 12 hours
                    maxAge: 12 * 60 * 60 * 1000,
                    httpOnly: true
                });
            };

            return res.status(201).json(data);

        } catch (err) {
            return next(err);
        }
    },

    editCartProduct: async (req, res, next) => {
        try {
            const data = await editCartProduct(req, res, next);
            if (data.cartID) {
                res.cookie("cartID", data.cartID, {
                    maxAge: 12 * 60 * 60 * 1000,
                    httpOnly: true
                });
            }

            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    },

    deleteFromCart: async (req, res, next) => {
        try {
            const data = await deleteFromCart(req, res, next);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    }

};