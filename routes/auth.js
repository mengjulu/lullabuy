const express = require("express");
const router = express.Router();
const authController = require("../controllers/page/authController");
const authApiController = require("../controllers/api/authApiController");
const validator = require("../middleware/validator");
const {
    isNotAuth
} = require("../middleware/auth");

router.route("/signin")
    .all(isNotAuth)
    .get(authController.getSigninPage)
    .post(validator.signinInfo, authApiController.signin);

router.route("/signup")
    .all(isNotAuth)
    .get(authController.getSignupPage)
    .post(validator.signupInfo, authApiController.signup);
    
router.get("/signout", authApiController.signout);

module.exports = router;