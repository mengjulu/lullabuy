const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.HOTMAIL_ACCOUNT,
        pass: process.env.HOTMAIL_PASSWORD
    }
});


module.exports = transporter;