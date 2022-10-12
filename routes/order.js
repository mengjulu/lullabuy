const express = require("express");
const router = express.Router();
const orderController = require("../controllers/page/orderController");
const orderApiController = require("../controllers/api/orderApiController");
const validator = require("../middleware/validator");
const {
    verifyOrderToken
} = require("../middleware/jwtToken");
const {
    isAdminNotAuth
} = require("../middleware/auth");

router.post("/checkout",
    isAdminNotAuth,
    validator.shippingInfo,
    orderApiController.checkout);

router.post("/payment/callback",
    orderApiController.paymentCallback);

router.route("/payment/:orderNumber")
    .all(isAdminNotAuth)
    .get(orderController.getPayment)
    .post(orderController.getPaymentResult);

router.get("/order/:token",
    verifyOrderToken, orderController.getOrderDetails);
    
module.exports = router;