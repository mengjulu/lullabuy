const client = require("../config/redis");
const User = require("../models").User;
const {
    getProductCache
} = require("../utils/cache");
const {
    getCartInfo,
    getCartSum
} = require("../utils/cart");
const {
    getCartCookie
} = require("../utils/cookieParser");
const crypto = require("crypto");

module.exports = {
    getCart: async (req, res, next) => {

        const cartID = getCartCookie(req);
        const user = req.user ? await User.findByPk(req.user.id) : null;
        const carts = cartID ? await getCartInfo(cartID) : [];
        const cartSum = cartID ? await getCartSum(carts) : 0;

        return {
            pageTitle: "Lullabuy || Cart",
            carts: carts,
            cartSum: cartSum,
            user: user
        };
    },

    addToCart: async (req, res, next) => {

        const cookie = getCartCookie(req);
        const cartID = cookie ? cookie : crypto.randomUUID();
        const productID = req.body.productID;
        const productInCart = await client.HGET(cartID, productID);
        const product = await getProductCache(productID);
        const stock = product.stock;
        let cartNum = await client.HLEN(cartID);
        let addStatus = false;

        //  Add to cart if the stock is greater or equal to the amount of product in cart
        if (stock > productInCart) {
            // Edit the amount of product in cart or add the product to cart
            productInCart ? await client.HINCRBY(cartID, productID, 1) :
                (await client.HSET(cartID, productID, 1), cartNum++);
            addStatus = true;
        } else if (stock < productInCart) {
            // Set the stock as the quantity if the stock is less than the amount of product in cart
            await client.HSET(cartID, productID, stock);
        };

        // Reset cart expiration if it's visitor's cart
        if (!req.user) await client.EXPIRE(cartID, 43200);

        return {
            cartNum: cartNum,
            status: addStatus,
            stock: stock,
            cartID: !req.user ? cartID : null
        }
    },

    editCartProduct: async (req, res, next) => {

        const cartID = getCartCookie(req);
        const productID = req.body.productID;
        const editAmount = Number(req.body.editAmount);
        const productInCart = Number(await client.HGET(cartID, productID));
        const product = await getProductCache(productID);
        let remainingStock = product.stock;
        let editedAmount = 0;
        let editStatus = false;
        let productEditedQuantity;

        // Edit the amount of product in cart if the stock is greater than the amount of product in cart
        // or the stock equals to the amount of product in cart when editAmount equals -1
        if (remainingStock > productInCart || (remainingStock == productInCart && editAmount == -1)) {
            await client.HINCRBY(cartID, productID, editAmount);
            productEditedQuantity = productInCart + editAmount;
            editedAmount = editAmount;
            editStatus = true;

        // Set the stock as the quantity if the amount of product in cart is greater than the stock
        } else if (remainingStock < productInCart) {
            await client.HSET(cartID, productID, remainingStock);
            productEditedQuantity = remainingStock;
            editedAmount = remainingStock - productInCart;
        } else {
            productEditedQuantity = remainingStock;
        };
        // Reset cart expiration if it's visitor's cart
        if (!req.user) await client.EXPIRE(cartID, 43200);
        return {
            productEditedQuantity: productEditedQuantity,
            editedAmount: editedAmount,
            status: editStatus,
            stock: remainingStock,
            cartID: !req.user ? cartID : null
        };
    },

    deleteFromCart: async (req, res, next) => {

        const cartID = getCartCookie(req);
        const productID = req.body.productID;
        const deleteStatus = await client.HDEL(cartID, productID);
        const cartNum = await client.HLEN(cartID);

        return {
            deleteStatus: !!deleteStatus,
            cartNum: cartNum
        };
    }
}