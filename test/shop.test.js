const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models").User;
const Product = require("../models").Product;
const shopService = require("../service/shopService");
let req;
let res;
let product;

describe("Shop service", () => {
    before("stub config", () => {
        sinon.stub(User, "findByPk").returns({
            getProducts: () => {
                return []
            }
        });
        sinon.stub(Product, "findAll").returns([]);
        product = sinon.stub(Product, "findOne");

    });

    it("should return page title for cover page.", () => {
        res = shopService.getCoverPage(req, res, () => {});
        expect(res.pageTitle).to.equal("Lullabuy || Good Night, Sleep Tight!");
    });

    it("should return page title, products and other data for product page.", async () => {
        const productCategory = "category";
        const productSubCategory = "subcategory"

        req = {
            params: {
                productCategory: productCategory,
                productSubCategory: productSubCategory
            },
            query: {
                sort: ""
            }
        }

        res = await shopService.getProducts(req, res, () => {});
        expect(res.pageTitle).to.equal(`Lullabuy || ${productCategory}`);
        expect(res.allProducts).to.be.a("array");
        expect(res.wishlists).to.be.a("array");
        expect(res.sortUrl).to.equal(`${productCategory}/${productSubCategory}`);
        expect(res.breadcrumb).to.include.members([productCategory, productSubCategory]);
    });
    context("Get product description:", () => {
        specify("should return page title, products information for product description page.", async () => {
            const productName = "test";

            req = {
                params: {
                    productName: productName,
                },
                user: {
                    id: ""
                }
            }
            product.returns({});

            res = await shopService.getProductDescription(req, res, () => {});
            expect(res.pageTitle).to.equal(`Lullabuy || ${productName}`);
            expect(res.product).to.be.a("object");
            expect(res.wishlists).to.be.a("array");
        });

        specify("should throw error due to non-existent product.", async () => {
            const productName = "test";

            req = {
                params: {
                    productName: productName,
                },
                user: {
                    id: ""
                }
            }
            product.returns();

            res = await shopService.getProductDescription(req, res, (err) => {
                expect(err).to.be.an("error");
                expect(err.statusCode).to.equal(404);
                expect(err.data.pageTitle).to.equal("Product not found!");

            });
        })
    });


    it("should return page title, products information and other data for  search result page.", async () => {
        const search = "test";
        req = {
            query: {
                q: search
            },
            user: {
                id: ""
            }
        };

        res = await shopService.getSearch(req, res, () => {});
        expect(res.pageTitle).to.equal(`Lullabuy || Search result for: ${search}`);
        expect(res.title).to.equal(`Search result for “ ${search} ”`);
        expect(res.allProducts).to.be.a("array");
        expect(res.wishlists).to.be.a("array");
    });

    it("should return route `/search?q=`.", () => {
        const search = "test";
        req = {
            body: {
                search: search
            }
        };

        res = shopService.search(req, res, () => {});
        expect(res).to.equal(`/search?q=${search}`);
    });

    after("restore stub function", () => {
        User.findByPk.restore();
        Product.findAll.restore();
        Product.findOne.restore();
    });
});