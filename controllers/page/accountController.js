const {
    getWishlist,
    getUserOrders,
    getUserOrderDetails,
    getSettings,
    getPassword
} = require("../../service/accountService");

module.exports = {

    getWishlist: async (req, res, next) => {
        try {
            const data = await getWishlist(req, res, next);
            res.status(200).render("account/wishlist", data);

        } catch (err) {
            return next(err);
        }
    },

    getOrder: async (req, res, next) => {
        try {
            const data = await getUserOrders(req, res, next);
            res.status(200).render("account/order", data);

        } catch (err) {
            return next(err);
        }
    },

    getUserOrderDetails: async (req, res, next) => {
        try {
            const data = await getUserOrderDetails(req, res, next);
            return res.status(200).render("account/orderDetail", data);

        } catch (err) {
            return next(err);
        }
    },

    getSettings: async (req, res, next) => {
        try {
            const data = await getSettings(req, res, next);
            return res.status(200).render("account/settings", data);

        } catch (err) {
            return next(err);
        }
    },

    getPassword: async (req, res, next) => {
        try {
            const data = await getPassword(req, res, next);
            return res.status(200).render("account/password", data);

        } catch (err) {
            return next(err);
        }
    }
};