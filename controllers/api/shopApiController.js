const {
    search
} = require("../../service/shopService");

module.exports = {

    search: (req, res, next) => {
        try {
            const route = search(req, res, next);
            return res.redirect(route);

        } catch (err) {
            return next(err);
        }
    }
};