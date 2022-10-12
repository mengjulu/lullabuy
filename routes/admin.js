const express = require("express");
const router = express.Router();
const adminController = require("../controllers/page/adminController");
const adminApiController = require("../controllers/api/adminApiController");
const upload = require("../config/multer");
const {
    isAdminAuth
} = require("../middleware/auth");

// Verify users has admin permissions
router.all(isAdminAuth);

router.get("/",
    adminController.getAdminPage);

// Order related
router.get("/order",
    adminController.getManageOrderPage);
router.route("/order/:orderNumber")
    .get(adminController.getOrderDetails)
    .post(adminApiController.resendOrderLetter)
    .patch(adminApiController.cancelOrder)
    .delete(adminApiController.deleteOrder);

// Product related
router.get("/product/:productCategory(all|women|men)",
    adminController.getManageProductPage);
router.get("/product/:productCategory(women|men)/:productSubCategory(robes|pajamas|others)",
    adminController.getManageProductPage);
router.route("/product")
    .get(adminController.getCreateProductPage)
    .post(upload.single("photo"), adminApiController.createProduct);
router.route("/product/:productID")
    .get(adminController.getEditProductPage)
    .put(upload.single("photo"), adminApiController.editProduct)
    .delete(adminApiController.deleteProduct);
    
// User related
router.route("/user")
    .get(adminController.getManageUserPage)
    .patch(adminApiController.editAdmin);

module.exports = router;