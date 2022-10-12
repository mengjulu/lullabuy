const express = require("express");
const ejs = require("ejs");
const app = express();
const methodOverride = require("method-override");
const {
    getCartNum
} = require("./utils/cart");
const {
    verifyUserToken
} = require("./middleware/jwtToken");

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(async (req, res, next) => {
    // Verify jwtToken
    await verifyUserToken(req);

    // Get number of products in cart
    const cartNum = await getCartNum(req);

    res.locals.cartNum = cartNum;
    res.locals.user = req.user;
    next();
});

// Route settings
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const accountRoutes = require("./routes/account");
const orderRoutes = require("./routes/order");

app.use(shopRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use("/account", accountRoutes);
app.use("/admin", adminRoutes);

// Error handling
const errorController = require("./controllers/errorController");
app.use(errorController.customHandler);
app.get("/error", errorController.get500Error);
app.get("*", errorController.get404Error);

app.listen(process.env.PORT || 3000, () => {
    console.log("Log in!")
});

module.exports = app;