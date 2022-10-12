const {
    body,
    validationResult
} = require("express-validator");

const errorHandling = (req, res, next) => {
    const error = validationResult(req).errors;
    if (error.length != 0) {
        return res.status(422).json({
            status: false,
            message: error[0].msg
        });
    }
    next();
};

module.exports = {
    signinInfo: [
        body("account").isEmail().withMessage("The account should be valid email address.").trim().escape(),
        body("password").isLength({
            min: 8
        }).withMessage("The password should more than 8 characters.").trim().escape(),
        errorHandling
    ],
    signupInfo: [
        body("account").isEmail().normalizeEmail().trim().escape().withMessage("The account should be a valid email address."),
        body("password").isLength({
            min: 8
        }).withMessage("The password should more than 8 characters.").trim().escape(),
        body("firstName").notEmpty().withMessage("Please enter a valid first name.").trim().escape(),
        body("lastName").notEmpty().withMessage("Please enter a valid last name.").trim().escape(),
        body("number").isMobilePhone().withMessage("Please enter a valid phone number.").notEmpty().withMessage("Please enter a valid phone number."),
        errorHandling
    ],
    shippingInfo: [
        body("firstName").notEmpty().withMessage("Please enter a valid first name.").trim().escape(),
        body("lastName").notEmpty().withMessage("Please enter a valid last name.").trim().escape(),
        body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address.").trim().escape(),
        body("number").notEmpty().isMobilePhone().withMessage("Please enter a valid phone number."),
        body("address").notEmpty().withMessage("Please enter a valid address.").trim().escape(),
        errorHandling
    ],
    editPersonalInfo: [
        body("firstName").notEmpty().trim().escape().withMessage("Please enter a valid first name."),
        body("lastName").notEmpty().withMessage("Please enter a valid last name.").trim().escape(),
        body("number").notEmpty().isMobilePhone().withMessage("Please enter a valid phone number."),
        body("address").notEmpty().withMessage("Please enter a valid address.").trim().escape(),
        errorHandling
    ],
    editPasswordInfo: [
        body("currentPwd").notEmpty().withMessage("Please enter a valid current password."),
        body("newPwd").isLength({
            min: 8
        }).withMessage("The password should more than 8 characters.").escape().trim(),
        errorHandling
    ]
};