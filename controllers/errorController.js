const {
    customHandler,
    get404Error,
    get500Error
} = require("../service/errorService");

module.exports = {

    customHandler: async (err, req, res, next) => {
        const message = await customHandler(err, req, res, next);
        const status = message.status;
        const data = message.data;

        return status != 500 ? res.status(status).render("error", data) : res.status(500).redirect("/error");
    },

    get404Error: async (req, res, next) => {
        const data = await get404Error(req, res, next);
        return res.status(404).render("error", data);
    },

    get500Error: async (req, res, next) => {
        const data = await get500Error(req, res, next);
        return res.status(500).render("error", data);
    }

}