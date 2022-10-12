const {
    getUserCookie
} = require("../utils/cookieParser");
const errorResponse = require("../config/error");

module.exports = {
    isAuth: (req, res, next) => {
        try {
            const token = getUserCookie(req).token;
            return token ? next() : res.redirect("/signin");

        } catch (err) {
            return next(err);
        }
    },

    isNotAuth: (req, res, next) => {
        try {
            const token = getUserCookie(req).token;
            return !token ? next() : res.redirect("/");

        } catch (err) {
            return next(err);
        }
    },

    isAdminAuth: (req, res, next) => {
        try {
            const {
                tokenType,
                token
            } = getUserCookie(req);
            const adminToken = tokenType == "adminJwtToken" ? token : null;

            return adminToken ? next() : next(new errorResponse(403, "User not authorized", {
                pageTitle: `User not authorized!`,
                errorMessage: `Oops! Seems you're not authorized.`
            }));

        } catch (err) {
            return next(err);
        }
    },

    isAdminNotAuth: (req, res, next) => {
        try {
            const {
                tokenType,
                token
            } = getUserCookie(req);
            const adminToken = tokenType == "adminJwtToken" ? token : null;
            return !adminToken ? next() : res.redirect("/admin");

        } catch (err) {
            return next(err);
        }
    }
};