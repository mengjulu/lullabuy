module.exports = {

    customHandler: async (err, req, res, next) => {
        const status = err.statusCode ? err.statusCode : 500;
        const data = err.data;

        return {
            status: status,
            data: data
        };
    },

    get404Error: async (req, res, next) => {
        return {
            pageTitle: "Page not found!",
            errorMessage: "Oops! Seems the page doesn’t exist.",
        };
    },

    get500Error: async (req, res, next) => {
        return {
            pageTitle: "Oops! Something goes wrong",
            errorMessage: "Apologize for the inconvenience! We will fix it ASAP!",
        };
    }
};