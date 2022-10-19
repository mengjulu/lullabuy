const client = require("../config/redis");
const {
    getCartCookie
} = require("./cookieParser");
const {
    getProductCache
} = require("./cache");

module.exports = {
    // Get the number of products in cart
    getCartNum: async (req) => {
        const cartID = getCartCookie(req);
        const cartNum = cartID ? await client.hlen(cartID) : 0;
        return cartNum;
    },

    // Get product infomation from cart
    getCartInfo: async (cartID) => {

        let carts = cartID ? Object.entries(await client.hgetall(cartID)) : [];

        for (let i = 0; i < carts.length; i++) {
            const productID = carts[i][0];
            const productQty = carts[i][1];
            const product = await getProductCache(productID);

            // Modify cart quantity if cart quantity is more than current stock
            if (product.stock < Number(productQty)) {
                carts[i][1] = product.stock;
                await client.hset(cartID, productID, product.stock);
            };
            carts[i][0] = product;
        };
        return carts;
    },

    // Get total sum of cart
    getCartSum: (carts) => {
        let cartSum = 0;

        for (let i = 0; i < carts.length; i++) {
            const product = carts[i][0];
            const quantity = carts[i][1];
            cartSum += product.price * quantity;
        };

        return cartSum;
    }
}