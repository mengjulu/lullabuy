const {
    getSigninPage,
    getSignupPage
} = require("../../service/authService");

module.exports = {

    getSignupPage: (req, res, next) => {
        try {
            const data = getSignupPage(req, res, next);
            res.status(200).render("account/signup", data);
        } catch (err) {
            return next(err);
        }
    },
    getSigninPage: (req, res, next) => {
        try {
            const data = getSigninPage(req, res, next);
            res.status(200).render("account/signin", data);
        } catch (err) {
            return next(err);
        }
    }
    
};