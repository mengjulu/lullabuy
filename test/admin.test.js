const sinon = require("sinon");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const client = require("../config/redis");
const adminService = require("../service/adminService");
const Order = require("../models").Order;
const User = require("../models").User;
const Product = require("../models").Product;
const fs = require("fs");
const transporter = require("../config/nodeMailer");

let req;
let res;
let order;
let allOrders;

describe("admin service", () => {

  before("stub config", () => {
    sinon.stub(fs, "unlinkSync");
    sinon.stub(client, "expire");
    sinon.stub(client, "get");
    sinon.stub(client, "setex");
    sinon.stub(transporter, "sendMail");
    sinon.stub(jwt, "sign").returns("testToken");
    sinon.stub(User, "findAll").returns([]);
    sinon.stub(User, "findByPk").returns({
      isAdmin: false,
      update: () => {}
    });
    sinon.stub(Product, "create");
    sinon.stub(Product, "findAll").returns([]);
    sinon.stub(Product, "findByPk").returns({
      update: () => {},
      destroy: () => {
        return 1
      }
    });
    sinon.stub(Order, "sum").returns(100);
    sinon.stub(Order, "count").returns(1);
    order = sinon.stub(Order, "findOne");
    allOrders = sinon.stub(Order, "findAll");

  });

  it("should return page title, all orders and data for chart for admin index page.", async () => {
    req = {
      body: {
        userID: ""
      }
    };
    allOrders.returns([]);
    res = await adminService.getAdminPage(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Admin: Index");
    expect(res.allOrders).to.be.an("array");
    expect(JSON.parse(res.yearlyBarData)).to.be.an("array");
    expect(JSON.parse(res.yearlyLineData)).to.be.an("array");

  });

  it("should return page title and all products for manage product page.", async () => {
    req = {
      params: {
        productCategory: "",
        productSubCategory: ""
      }
    };

    res = await adminService.getManageProductPage(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Admin: Manage product");
    expect(res.allProducts).to.be.an("array");
  });

  it("should return page title for create product page.", () => {
    res = adminService.getCreateProductPage(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Admin: Create product");

  });

  it("should return page title and product's information for edit product page.", async () => {
    req = {
      params: {
        productID: "test"
      }
    };

    res = await adminService.getEditProductPage(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Admin: Edit product");
    expect(res.product).to.be.a("object");
  });

  it("should return page title and all users for manage users page.", async () => {

    res = await adminService.getManageUserPage(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Admin: Manage users");
    expect(res.allUsers).to.be.an("array");
  });
  context("Get order detail:", () => {

    specify("should return page title and order information for order detail page.", async () => {
      const mockOrderNumber = "00000000";
      req = {
        params: {
          orderNumber: mockOrderNumber
        }
      };
      order.returns({
        orderSum: 100,
        getProducts: () => {
          return []
        }
      })
      res = await adminService.getOrderDetails(req, res, () => {});
      expect(res.pageTitle).to.equal(`Lullabuy || Order details: ${mockOrderNumber}`);
      expect(res.order).to.be.an("object");
      expect(res.orderSum).to.equal(100);
      expect(res.productDetails).to.be.an("array");
    });

    specify("should throw error because the order isn't existed.", async () => {
      const mockOrderNumber = "00000000";
      req = {
        params: {
          orderNumber: mockOrderNumber
        }
      };
      order.returns();
      res = await adminService.getOrderDetails(req, res, (err) => {
        expect(err).to.be.an("error");
        expect(err.statusCode).to.equal(404);
        expect(err.data.pageTitle).to.equal("Order not found!");
      });
    });
  });

  it("should edit user's admin status and return admin status: true.", async () => {
    req = {
      body: {
        userID: ""
      }
    };

    res = await adminService.editAdmin(req, res, () => {});
    expect(res.adminStatus).to.be.true;
  });

  it("should create a new product and return route `/admin/product/all`.", async () => {
    const exceptedResult = "/admin/product/all";
    req = {
      body: {
        name: "",
        price: "",
        stock: "",
        category: "",
        subcategory: "",
        description: ""
      },
      file: {
        path: ""
      }
    };

    res = await adminService.createProduct(req, res, () => {});
    expect(res).to.equal(exceptedResult);
  });

  it("should edit a product and return route `/admin/product/all`.", async () => {
    const exceptedResult = "/admin/product/all";
    req = {
      params: {
        productID: ""
      },
      body: {
        name: "",
        price: "",
        stock: "",
        category: "",
        subcategory: "",
        description: ""
      }
    };

    res = await adminService.editProduct(req, res, () => {});
    expect(res).to.equal(exceptedResult);
  });

  it("should delete a product and return status.", async () => {
    req = {
      params: {
        productID: ""
      }
    };

    res = await adminService.deleteProduct(req, res, () => {});
    expect(res.status).to.be.true;
  });

  context("Resend confirmation letter:", () => {
    req = {
      params: {
        orderNumber: ""
      }
    };

    specify("should resend the letter and return status: true.", async () => {
      order.returns({
        orderNumber: "test",
        address: "test",
        number: "test",
        orderSum: 0,
        getProducts: () => {
          return [{
            name: "test",
            price: 1,
            orderProduct: {
              quantity: 1
            }
          }]
        }
      });

      res = await adminService.resendOrderLetter(req, res, () => {});
      expect(res).to.be.true;
    });

    specify("should throw error because the order isn't existed.", async () => {
      order.returns();

      await adminService.resendOrderLetter(req, res, (err) => {
        expect(err).to.be.an("error");
        expect(err.statusCode).to.equal(404);
        expect(err.data.pageTitle).to.equal("Order not found!");
      });
    });
  });

  context("Delete order:", () => {
    specify("should delete the order and return status: true.", async () => {
      order.returns({
        setProducts: () => {},
        destroy: () => {
          return 1
        }
      });

      res = await adminService.deleteOrder(req, res, () => {});
      expect(res.status).to.be.true;
    });

    specify("should throw error because the order isn't existed.", async () => {
      order.returns();

      await adminService.deleteOrder(req, res, (err) => {
        expect(err).to.be.an("error");
        expect(err.statusCode).to.equal(404);
        expect(err.data.pageTitle).to.equal("Order not found!");
      });
    });
  });

  after("restore stub function", () => {
    fs.unlinkSync.restore();
    client.expire.restore();
    client.get.restore();
    client.setex.restore();
    transporter.sendMail.restore();
    User.findAll.restore();
    User.findByPk.restore();
    Product.findAll.restore();
    Product.findByPk.restore();
    Product.create.restore();
    Order.sum.restore();
    Order.count.restore();
    Order.findOne.restore();
    Order.findAll.restore();
    jwt.sign.restore();
  })
});