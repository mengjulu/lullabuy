const express = require("express");
const router = express.Router();
const accountController = require("../controllers/page/accountController");
const accountApiController = require("../controllers/api/accountApiController");
const orderApiController = require("../controllers/api/orderApiController");
const validator = require("../middleware/validator");
const {
    isAuth
} = require("../middleware/auth");

router.all(isAuth);

router.get("/order", accountController.getOrder);
router.route("/order/:orderNumber")
    .get(accountController.getUserOrderDetails)
    .patch(orderApiController.cancelOrder);
router.route("/wishlist")
    .get(accountController.getWishlist)
    .put(accountApiController.editWishList);
router.route("/settings")
    .get(accountController.getSettings)
    .put(validator.editPersonalInfo, accountApiController.editPersonalInfo);
router.route("/settings/password")
    .get(accountController.getPassword)
    .patch(validator.editPasswordInfo, accountApiController.editPassword);

module.exports = router;