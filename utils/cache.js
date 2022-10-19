const client = require("../config/redis");
const Product = require("../models").Product;

module.exports = {
    getProductCache: async (productID) => {
        let products;
        //check if there's cache in Redis
        const cacheProduct = await client.get(productID);

        //if not, get data in database and save data in Redis
        if (!cacheProduct) {
            products = await Product.findByPk(productID, {
                raw: true
            });
            await client.setex(productID, 3600, JSON.stringify(products));
        } else {
            products = JSON.parse(cacheProduct);
        };

        return products;
    }
};