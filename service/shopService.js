const Op = require("sequelize").Op;
const User = require("../models").User;
const Product = require("../models").Product;
const errorResponse = require("../config/error");

const sortQuery = (querySort) => {
    return querySort === "price-ascending" ? ["price", "ASC"] :
        querySort === "price-descending" ? ["price", "DESC"] :
        querySort === "created-descending" ? ["updatedAt", "DESC"] : ["name", "ASC"];
};

module.exports = {

    getCoverPage: (req, res, next) => {
        return {
            pageTitle: "Lullabuy || Good Night, Sleep Tight!"
        };
    },

    getProducts: async (req, res, next) => {

        const productCategory = req.params.productCategory;
        const productSubCategory = req.params.productSubCategory;
        const user = req.user ? await User.findByPk(req.user.id) : null;
        const wishlists = user ? await user.getProducts({
            attributes: ["id"],
            raw: true
        }) : [];
        const wishlistID = wishlists.map(e => e = e["id"]);
        const condition =
            productCategory == "all" ? {} :
            productSubCategory ? {
                category: productCategory,
                subcategory: productSubCategory
            } : {
                category: productCategory
            };
        const sortUrl = productCategory == "all" ? "all" :
            productSubCategory ? `${productCategory}/${productSubCategory}` : `${productCategory}`;

        const breadcrumb = productCategory == "all" ? null :
            productSubCategory ? [productCategory, productSubCategory] : [productCategory, "all"];

        const allProducts = await Product.findAll({
            where: condition,
            order: [sortQuery(req.query.sort)]
        });

        return {
            pageTitle: `Lullabuy || ${productCategory}`,
            allProducts: allProducts,
            wishlists: wishlistID,
            sortUrl: sortUrl,
            breadcrumb: breadcrumb
        };
    },

    getProductDescription: async (req, res, next) => {

        const productName = req.params.productName;
        const product = await Product.findOne({
            where: {
                name: productName
            }
        }, {
            raw: true
        });

        if (!product) return next(new errorResponse(404, "Product not found!", {
            pageTitle: `Product not found!`,
            errorMessage: `Oops! Seems the product doesn’t exist.`
        }));

        const user = req.user ? await User.findByPk(req.user.id) : undefined;
        const wishlists = user ? await user.getProducts({
            attributes: ["id"],
            raw: true
        }) : [];
        const wishlistID = wishlists.map(e => e = e["id"]);

        return {
            pageTitle: `Lullabuy || ${productName}`,
            product: product,
            wishlists: wishlistID
        };
    },
    
    getSearch: async (req, res, next) => {

        const searchKey = req.query.q;
        const user = req.user ? await User.findByPk(req.user.id) : undefined;
        const wishlists = user ? await user.getProducts({
            attributes: ["id"],
            raw: true
        }) : [];
        const wishlistID = wishlists.map(e => e = e["id"]);
        const allProducts = await Product.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.substring]: searchKey
                    }
                }]
            },
            order: [sortQuery(req.query.sort)]
        });

        return {
            pageTitle: `Lullabuy || Search result for: ${searchKey}`,
            title: `Search result for “ ${searchKey} ”`,
            allProducts: allProducts,
            wishlists: wishlistID
        };
    },

    search: (req, res, next) => {
        const search = req.body.search;
        return `/search?q=${search}`;
    }
};