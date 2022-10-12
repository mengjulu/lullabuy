const path = require("path");
const transporter = require("../../config/nodeMailer");
const {
    createMailHtml
} = require("./mailFormat");
const {
    generateOrderTokenLink
} = require("../../utils/jwtToken");
require("dotenv").config();

module.exports = {
    sendOrderContentMail: async (order, orderSum, productDetails) => {

        const orderUrl = generateOrderTokenLink(order.orderNumber);
        const html = createMailHtml(order, orderSum, productDetails, orderUrl);
        let mailContent = {
            from: `"Lullabuy" <${process.env.HOTMAIL_ACCOUNT}>`,
            to: `${order.email}`,
            subject: "Order Comfirmed!",
            html: `${html}`,
            attachments: [{
                filename: "brand.svg",
                path: path.resolve("./") + "/public/image/brand.svg",
                cid: "logo"
            }]
        };

        return transporter.sendMail(mailContent);
    }
}