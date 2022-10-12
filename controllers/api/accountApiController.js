const {
    editWishList,
    editPersonalInfo,
    editPassword
} = require("../../service/accountService");

module.exports = {

    editWishList: async (req, res, next) => {
        try {
            const data = await editWishList(req, res, next);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    },
    editPersonalInfo: async (req, res, next) => {
        try {
            const data = await editPersonalInfo(req, res, next);
            return res.status(200).json(data);

        } catch (err) {
            return next(err);
        }
    },
    editPassword: async (req, res, next) => {
        try {
            const data = await editPassword(req, res, next);
            const statusCode = data.status ? 200 : 401;
            return res.status(statusCode).json(data);

        } catch (err) {
            return next(err);
        }
    }
};