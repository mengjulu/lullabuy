const express = require("express");
const router = express.Router();
const shopController = require("../controllers/page/shopController");
const shopApiController = require("../controllers/api/shopApiController");
const cartApiController = require("../controllers/api/cartApiController");
const {
    isAdminNotAuth
} = require("../middleware/auth");

router.get("/", isAdminNotAuth,
    shopController.getCoverPage);
router.get("/:productCategory(women|men|all)",
    isAdminNotAuth, shopController.getProducts);
router.get("/:productCategory(women|men)/:productSubCategory(robes|pajamas|others)",
    isAdminNotAuth, shopController.getProducts);
router.get("/:productCategory(women|men)/:productSubCategory(robes|pajamas|others)/:productName",
    isAdminNotAuth, shopController.getProductDescription);
router.route("/search")
    .all(isAdminNotAuth)
    .get(shopController.getSearch)
    .post(shopApiController.search);

router.route("/cart")
    .all(isAdminNotAuth)
    .get(shopController.getCart)
    .post(cartApiController.addToCart)
    .put(cartApiController.editCartProduct)
    .delete(cartApiController.deleteFromCart);

module.exports = router;