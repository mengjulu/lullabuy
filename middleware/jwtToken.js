const jwt = require("jsonwebtoken");
const errorResponse = require("../config/error");
const {
    getUserCookie
} = require("../utils/cookieParser");
require("dotenv").config();

module.exports = {
    verifyUserToken: (req) => {
        const token = getUserCookie(req).token;

        // Visitor
        if (!token) return;

        // If token exists, verify the token
         jwt.verify(token, process.env.JWTSECRET, (err, user) => {
            if (err) {
                console.log("JwtToken error: ", err);
                throw err;
            }
            req.user = user;
            return;
        });
    },
    verifyOrderToken: (req, res, next) => {

        const token = req.params.token;
        jwt.verify(token, process.env.JWTSECRET, (err, data) => {
            // token verification is failed, throw error
            if (err) return next(new errorResponse(401, "jwt authentication errors", {
                pageTitle: `Oops!!`,
                errorMessage: `Seems something goes wrong, please contact us.`
            }))
            req.params.orderNumber = data.orderNumber;
            next();
        });
    }
};