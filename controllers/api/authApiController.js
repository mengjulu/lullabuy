const {
    signup,
    signin
} = require("../../service/authService");

module.exports = {

    signup: async (req, res, next) => {
        try {
            const data = await signup(req, res, next);
            const cartID = data.cartID;
            const token = data.token;
            const statusCode = data.status ? 201 : 401;
            // If visitor has cart, clear cart cookie
            if (cartID) res.clearCookie("cartID");
            // If registration is successful, and save jwtToken to cookie
            if (token) res.cookie("jwtToken", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(statusCode).json(data);

        } catch (err) {
            return next(err);
        }
    },

    signin: async (req, res, next) => {
        try {
            const data = await signin(req, res, next);
            const cartID = data.cartID;
            const tokenType = data.tokenType;
            const statusCode = data.status ? 200 : 401;
            const token = data.token;
            // If visitor has cart, clear cart cookie
            if (cartID) res.clearCookie("cartID");
            // If login is successful, and save jwtToken to cookie
            if (tokenType) res.cookie(tokenType, token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(statusCode).json(data);

        } catch (err) {
            return next(err);
        }
    },

    signout: (req, res, next) => {
        res.clearCookie("jwtToken");
        res.clearCookie("adminJwtToken");
        return res.redirect("/signin");
    }
};