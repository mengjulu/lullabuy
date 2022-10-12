const {
    getCart
} = require("../../service/cartService");
const {
    getCoverPage,
    getProducts,
    getProductDescription,
    getSearch
} = require("../../service/shopService");

module.exports = {

    getCoverPage: (req, res, next) => {
        try {
            const data = getCoverPage(req, res, next);
            return res.status(200).render("shop/coverPage", data);
        } catch (err) {
            return next(err);
        }
    },

    getProducts: async (req, res, next) => {
        try {
            const data = await getProducts(req, res, next);
            return res.status(200).render("shop/index", data);

        } catch (err) {
            return next(err);
        }
    },

    getProductDescription: async (req, res, next) => {
        try {
            const data = await getProductDescription(req, res, next);
            return res.status(200).render("shop/description", data);

        } catch (err) {
            return next(err);
        }
    },

    getSearch: async (req, res, next) => {
        try {
            const data = await getSearch(req, res, next);
            return res.status(200).render("shop/search", data);

        } catch (err) {
            return next(err);
        }
    },

    getCart: async (req, res, next) => {
        try {
            const data = await getCart(req, res, next);
            res.set("Cache-Control", "no-store");
            return res.status(200).render("shop/cart", data);

        } catch (err) {
            return next(err);
        }
    }
};