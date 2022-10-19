const Product = require("../models").Product;
const Order = require("../models").Order;
const User = require("../models").User;
const Op = require("sequelize").Op;
const fs = require("fs");
const crypto = require("crypto");
const client = require("../config/redis");
const errorResponse = require("../config/error");
const {
    sendOrderContentMail
} = require("../utils/nodeMailer/mailer");
const {
    getMonthlyData
} = require("../utils/chart");
const {
    getProductCache
} = require("../utils/cache");
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

module.exports = {
    getAdminPage: async (req, res, next) => {

        const allOrders = await Order.findAll({
            where: {
                createdAt: {
                    [Op.gt]: new Date(year, month, day)
                }
            }
        });
        const {
            sumData,
            countData
        } = await getMonthlyData();

        return {
            pageTitle: "Lullabuy || Admin: Index",
            allOrders: allOrders,
            yearlyBarData: JSON.stringify(sumData),
            yearlyLineData: JSON.stringify(countData)
        };
    },

    getManageProductPage: async (req, res, next) => {

        const productCategory = req.params.productCategory;
        const productSubCategory = req.params.productSubCategory;

        const condition =
            productCategory == "all" ? {} :
            productSubCategory ? {
                category: productCategory,
                subcategory: productSubCategory
            } : {
                category: productCategory
            };

        const allProducts = await Product.findAll({
            where: condition
        });

        return {
            pageTitle: "Lullabuy || Admin: Manage product",
            allProducts: allProducts
        };
    },

    getCreateProductPage: (req, res, next) => {

        return {
            pageTitle: "Lullabuy || Admin: Create product"
        };
    },

    getEditProductPage: async (req, res, next) => {

        const productID = req.params.productID;
        const product = await getProductCache(productID);

        return {
            pageTitle: "Lullabuy || Admin: Edit product",
            product: product
        };
    },

    getManageOrderPage: async (req, res, next) => {

        const status = req.query.status ? {
            paymentStatus: req.query.status
        } : {};

        const allOrders = await Order.findAll({
            where: status,
            order: [
                ["createdAt", "DESC"]
            ]
        });

        return {
            pageTitle: "Lullabuy || Admin: Manage orders",
            allOrders: allOrders
        };
    },
    getOrderDetails: async (req, res, next) => {

        const orderNumber = req.params.orderNumber;
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber
            }
        });

        if (!order) return next(new errorResponse(404, "Order not found!", {
            pageTitle: `Order not found!`,
            errorMessage: `Oops! Seems the order doesn’t exist.`
        }));

        const orderSum = order.orderSum;
        const productDetails = await order.getProducts({
            raw: true,
            joinTableAttributes: ["quantity"],
            paranoid: false
        });
        return {
            pageTitle: `Lullabuy || Order details: ${orderNumber}`,
            order: order,
            orderSum: orderSum,
            productDetails: productDetails
        };
    },

    getManageUserPage: async (req, res, next) => {

        const allUsers = await User.findAll({
            raw: true
        });

        return {
            pageTitle: "Lullabuy || Admin: Manage users",
            allUsers: allUsers
        };
    },

    editAdmin: async (req, res, next) => {

        const userID = req.body.userID;
        const user = await User.findByPk(userID);
        const status = !user.isAdmin;

        await user.update({
            isAdmin: status
        });

        return {
            adminStatus: status
        };
    },

    createProduct: async (req, res, next) => {

        const name = req.body.name;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const description = req.body.description;
        const imageUrl = req.file.path.replace("public", "/static");

        await Product.create({
            id: crypto.randomUUID(),
            name: name,
            price: price,
            stock: stock,
            category: category,
            subcategory: subcategory,
            imageUrl: imageUrl,
            description: description
        });

        return "/admin/product/all";
    },

    editProduct: async (req, res, next) => {

        const name = req.body.name;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const description = req.body.description;
        const productID = req.params.productID;
        const product = await Product.findByPk(productID);
        const imageUrl = req.file ? req.file.path.replace("public", "/static") : product.imageUrl;

        // Update image if a new image is uploaded
        if (req.file) await fs.unlinkSync(product.imageUrl.replace("/static", "public"));

        await product.update({
            name: name,
            price: price,
            stock: stock,
            category: category,
            subcategory: subcategory,
            imageUrl: imageUrl,
            description: description
        });

        // Remove cache
        await client.expire(productID, 0);

        return "/admin/product/all";
    },

    deleteProduct: async (req, res, next) => {

        const productID = req.params.productID;
        const product = await Product.findByPk(productID);
        let productDeleteCheck;
        if (product) {
            await product.update({
                name: `${product.name} (${year}-${month+1}-${day})`
            });
            productDeleteCheck = await product.destroy();
        }

        return {
            status: !productDeleteCheck ? false : true
        };
    },

    resendOrderLetter: async (req, res, next) => {

        const orderNumber = req.params.orderNumber;
        // Only allows when the payment is completed
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber,
                paymentStatus: 1
            }
        });

        if (!order) return next(new errorResponse(404, "Order not found!", {
            pageTitle: `Order not found!`,
            errorMessage: `Oops! Seems the order doesn’t exist or not been paid.`
        }));

        const orderSum = order.orderSum;
        const productDetails = await order.getProducts({
            joinTableAttributes: ["quantity"],
            paranoid: false
        });

        sendOrderContentMail(order, orderSum, productDetails);
        return true;
    },

    deleteOrder: async (req, res, next) => {

        const orderNumber = req.params.orderNumber;
        // Only allows when the order is canceled
        const order = await Order.findOne({
            where: {
                orderNumber: orderNumber,
                paymentStatus: 3
            }
        });

        let deleteStatus = false;

        if (!order) return next(new errorResponse(404, "Order not found!", {
            pageTitle: `Order not found!`,
            errorMessage: `Oops! Seems the order doesn’t exist or haven't been canceled yet.`
        }));
        await order.setProducts(null);
        deleteStatus = await order.destroy();
        return {
            status: !!deleteStatus
        };
    }
};