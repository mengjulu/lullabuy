const {
    getAdminPage,
    getManageProductPage,
    getCreateProductPage,
    getEditProductPage,
    getManageOrderPage,
    getOrderDetails,
    getManageUserPage
} = require("../../service/adminService");

module.exports = {

    getAdminPage: async (req, res, next) => {
        try {
            const data = await getAdminPage(req, res, next);
            return res.status(200).render("admin/adminIndex", data);

        } catch (err) {
            return next(err);
        }
    },

    getManageProductPage: async (req, res, next) => {
        try {
            const data = await getManageProductPage(req, res, next);
            return res.status(200).render("admin/manageProduct", data);

        } catch (err) {
            return next(err);
        }
    },

    getCreateProductPage: (req, res, next) => {
        try {
            const data = getCreateProductPage(req, res, next);
            return res.status(200).render("admin/createProduct", data);

        } catch (err) {
            return next(err);
        }
    },

    getEditProductPage: async (req, res, next) => {
        try {
            const data = await getEditProductPage(req, res, next);
            return res.status(200).render("admin/editProduct", data);

        } catch (err) {
            return next(err);
        }
    },

    getManageOrderPage: async (req, res, next) => {
        try {
            const data = await getManageOrderPage(req, res, next);
            return res.status(200).render("admin/manageOrder", data);

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
    },

    getManageUserPage: async (req, res, next) => {
        try {
            const data = await getManageUserPage(req, res, next);
            return res.status(200).render("admin/manageUser", data);

        } catch (err) {
            return next(err);
        }
    }
};