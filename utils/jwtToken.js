const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    generateUserJwtToken: (id, adminStatus) => {
        return jwt.sign({
            "id": id,
            "isAdmin": adminStatus
        }, process.env.JWTSECRET, {
            expiresIn: "1d"
        });
    },
    generateOrderTokenLink: (orderNumber) => {
        const token = jwt.sign({
            "orderNumber": orderNumber,
        }, process.env.JWTSECRET);
        // Generate link of order details with jwtToken,
        // so buyers can link to their orders without authentication
        return `${process.env.MAIN_DOMAIN}/order/${token}`;
    }
};