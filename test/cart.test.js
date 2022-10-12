const expect = require("chai").expect;
const sinon = require("sinon");
const crypto = require("crypto");
const client = require("../config/redis");
const cartService = require("../service/cartService");
const User = require("../models").User;
const Product = require("../models").Product;
const mockID = "00000000-0000-0000-0000-000000000000";
let req;
let res;
let product;
let currProductQtyInCart;
let carts;
let cartNum;
let deleteStatus;

describe("Cart service", () => {
    before("stub config", () => {
        sinon.stub(crypto, "randomUUID").returns(mockID);
        sinon.stub(client, "GET");
        sinon.stub(client, "SETEX");
        sinon.stub(client, "HSET");
        sinon.stub(client, "HINCRBY");
        sinon.stub(client, "EXPIRE");
        currProductQtyInCart = sinon.stub(client, "HGET");
        carts = sinon.stub(client, "HGETALL");
        cartNum = sinon.stub(client, "HLEN");
        deleteStatus = sinon.stub(client, "HDEL");

        sinon.stub(User, "create").returns({
            id: "test",
            isAdmin: false
        });
        sinon.stub(User, "findByPk").returns({});
        user = sinon.stub(User, "findOne");
        product = sinon.stub(Product, "findByPk").returns({});
    });
    context("Get cart:", () => {
        specify("should return page title, carts, cartSum and user: null (visitor).", async () => {
            req = {
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            product.returns({
                stock: 1,
                price: 1
            });
            carts.returns({
                "test": 1
            });

            res = await cartService.getCart(req, res, () => {});
            expect(res.pageTitle).to.equal("Lullabuy || Cart");
            expect(res.carts).to.be.an("array");
            expect(res.cartSum).to.equal(1);
            expect(res.user).to.be.a("null");
        });

        specify("should return page title, carts, cartSum and user information.", async () => {
            req = {
                headers: {
                    cookie: ""
                },
                user: {
                    id: "test"
                }
            };
            product.returns({
                stock: 1,
                price: 1
            });
            carts.returns({
                "test": 1
            });

            res = await cartService.getCart(req, res, () => {});
            expect(res.pageTitle).to.equal("Lullabuy || Cart");
            expect(res.carts).to.be.an("array");
            expect(res.cartSum).to.equal(1);
            expect(res.user).to.be.a("object");
        });

    });
    context("Add to cart:", () => {
        specify("should create a cart with cartID and add product to cart, then return status and data.", async () => {
            req = {
                body: {
                    productID: ""
                },
                headers: {
                    cookie: ""
                }
            };
            product.returns({
                stock: 100
            });
            cartNum.returns(0);
            currProductQtyInCart.returns(0);

            res = await cartService.addToCart(req, res, () => {});
            expect(res.cartNum).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(mockID);
        });

        specify("should add product to cart (visitor), then return status: true and data.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: "",
                    cartQuantity: ""
                },
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            product.returns({
                stock: 100
            });
            cartNum.returns(0);
            currProductQtyInCart.returns(0);

            res = await cartService.addToCart(req, res, () => {});
            expect(res.cartNum).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(mockID);
        });

        specify("should add product to cart (user), then return status: true and data.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: "",
                    cartQuantity: ""
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };
            product.returns({
                stock: 100
            });
            cartNum.returns(0);
            currProductQtyInCart.returns(0);

            res = await cartService.addToCart(req, res, () => {});
            expect(res.cartNum).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });

        specify("should add existed product to cart and return status: true and data.", async () => {
            req = {
                body: {
                    productID: ""
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };
            product.returns({
                stock: 100
            });
            cartNum.returns(1);
            currProductQtyInCart.returns(1);

            res = await cartService.addToCart(req, res, () => {});
            expect(res.cartNum).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });

        specify("should return status: false and data because the cart amount is more than stock.", async () => {
            req = {
                body: {
                    productID: ""
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };
            product.returns({
                stock: 100
            });
            cartNum.returns(1);
            currProductQtyInCart.returns(101);

            res = await cartService.addToCart(req, res, () => {});
            expect(res.cartNum).to.equal(1);
            expect(res.status).to.be.false;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });
    });

    context("Edit cart:", () => {
        specify("should edit the amount of product in the cart (visitor), then return status: true and data.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: 1
                },
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            product.returns({
                stock: 100
            });
            currProductQtyInCart.returns(1);

            res = await cartService.editCartProduct(req, res, () => {});
            expect(res.productEditedQuantity).to.equal(2);
            expect(res.editedAmount).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(mockID);
        });

        specify("should edit the amount of product in the cart (user), then return status: true and data.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: 1
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };
            product.returns({
                stock: 100
            });
            currProductQtyInCart.returns(1);

            res = await cartService.editCartProduct(req, res, () => {});
            expect(res.productEditedQuantity).to.equal(2);
            expect(res.editedAmount).to.equal(1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });

        specify("should return status: true and data when amount in cart equals to product stock and editAmount = -1.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: -1
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };

            product.returns({
                stock: 100
            });
            currProductQtyInCart.returns(100);

            res = await cartService.editCartProduct(req, res, () => {});
            expect(res.productEditedQuantity).to.equal(99);
            expect(res.editedAmount).to.equal(-1);
            expect(res.status).to.be.true;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });

        specify("should return status: false and data when amount in cart equals to product stock and editAmount = 1.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: 1
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };

            product.returns({
                stock: 100
            });
            currProductQtyInCart.returns(100);

            res = await cartService.editCartProduct(req, res, () => {});
            expect(res.productEditedQuantity).to.equal(100);
            expect(res.editedAmount).to.equal(0);
            expect(res.status).to.be.false;
            expect(res.stock).to.equal(100);
            expect(res.cartID).to.equal(null);
        });

        specify("should return status: false and data when amount in cart is more than stock.", async () => {
            req = {
                body: {
                    productID: "",
                    editAmount: 1
                },
                headers: {
                    cookie: ""
                },
                user: {
                    id: mockID
                }
            };

            product.returns({
                stock: 98
            });
            currProductQtyInCart.returns(102);

            res = await cartService.editCartProduct(req, res, () => {});
            expect(res.productEditedQuantity).to.equal(98);
            expect(res.editedAmount).to.equal(-4);
            expect(res.status).to.be.false;
            expect(res.stock).to.equal(98);
            expect(res.cartID).to.equal(null);
        });

    });
    context("Delete from cart:", () => {
        specify("should delete product from product, then return status: true and data.", async () => {
            req = {
                body: {
                    productID: ""
                },
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            deleteStatus.returns(1);
            cartNum.returns(0);

            res = await cartService.deleteFromCart(req, res, () => {});
            expect(res.deleteStatus).to.be.true;
            expect(res.cartNum).to.equal(0);
        });

        specify("should return status: false and data because deletion failed.", async () => {
            req = {
                body: {
                    productID: ""
                },
                headers: {
                    cookie: `cartID=${mockID}`
                }
            };
            deleteStatus.returns(0);
            cartNum.returns(0);

            res = await cartService.deleteFromCart(req, res, () => {});
            expect(res.deleteStatus).to.be.false;
            expect(res.cartNum).to.equal(0);
        });
    });

    after("restore stub function", () => {
        crypto.randomUUID.restore();
        client.GET.restore();
        client.SETEX.restore();
        client.HSET.restore();
        client.HGET.restore();
        client.HINCRBY.restore();
        client.HGETALL.restore();
        client.HLEN.restore();
        client.HDEL.restore();
        client.EXPIRE.restore();
        User.findByPk.restore();
        User.create.restore();
        User.findOne.restore();
        Product.findByPk.restore();
    })
});