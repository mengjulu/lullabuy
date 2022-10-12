const expect = require("chai").expect;
const sinon = require("sinon");
const accountService = require("../service/accountService");
const User = require("../models").User;
const Order = require("../models").Order;
const bcrypt = require("bcrypt");
let req;
let res;
let order;
let passwordComparison;

describe("Account service", () => {

  before("stub config", () => {
    sinon.stub(Order, "findAll").returns([]);
    sinon.stub(User, "findByPk").returns({
      isAdmin: false,
      update: () => {},
      getProducts: () => {
        return []
      },
      hasProducts: () => {
        return true
      },
      addProducts: () => {},
      removeProducts: () => {}
    });

    order = sinon.stub(Order, "findOne");
    passwordComparison = sinon.stub(bcrypt, "compareSync");
  });

  it("should return page title and user's wishlist.", async () => {
    req = {
      user: {
        id: ""
      }
    };
    res = await accountService.getWishlist(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Wishlist");
    expect(res.wishlists).to.be.an("array");
  });

  it("should return page title and user's orders.", async () => {
    req = {
      user: {
        id: ""
      }
    };
    res = await accountService.getUserOrders(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Orders");
    expect(res.orders).to.be.an("array");
  });

  context("Get user's order details:", () => {
    specify("should return page title and the detail of user's order.", async () => {
      const mockOrderNumber = "000000000";
      req = {
        user: {
          id: ""
        },
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

      res = await accountService.getUserOrderDetails(req, res, () => {});
      expect(res.pageTitle).to.equal(`Lullabuy || Order details: ${mockOrderNumber}`);
      expect(res.order).to.be.an("object");
      expect(res.orderSum).to.equal(100);
      expect(res.productDetails).to.be.an("array");
    });

    specify("should throw error due to non-existent order.", async () => {
      const mockOrderNumber = "000000000";
      req = {
        user: {
          id: ""
        },
        params: {
          orderNumber: mockOrderNumber
        }
      };
      order.returns();

      res = await accountService.getUserOrderDetails(req, res, (err) => {
        expect(err).to.be.an("error");
        expect(err.statusCode).to.equal(404);
        expect(err.data.pageTitle).to.equal("Order not found!");
      });
    });
  })

  it("should return page title and user's information for settings page.", async () => {
    req = {
      user: {
        id: "",
        isAdmin: false
      }
    };
    res = await accountService.getSettings(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Settings");
    expect(res.user).to.be.an("object");
  });

  it("should return page title and user's information for password changing page.", async () => {
    req = {
      user: {
        id: "",
        isAdmin: false
      }
    };
    res = await accountService.getPassword(req, res, () => {});
    expect(res.pageTitle).to.equal("Lullabuy || Change password");
    expect(res.user).to.be.an("object");
  });

  it("should edit wishlist and return edit status.", async () => {
    req = {
      user: {
        id: ""
      },
      body: {
        productID: ""
      }
    };

    res = await accountService.editWishList(req, res, () => {});
    expect(res.status).to.be.false;
  });

  it("should edit personal infomation and return edit status.", async () => {
    req = {
      user: {
        id: ""
      },
      body: {
        productID: ""
      }
    };

    res = await accountService.editPersonalInfo(req, res, () => {});
    expect(res.status).to.be.true;
  });

  context("Edit password:", () => {
    specify("both are correct, then return status: true and message.", async () => {
      req = {
        user: {
          id: ""
        },
        body: {
          currentPwd: "test1",
          newPwd: "test2"
        }
      };

      passwordComparison.returns(true);
      res = await accountService.editPassword(req, res, () => {});
      expect(res.status).to.be.true;
      expect(res.message).to.equal("Password updated!");
    });

    specify("the current password is incorrect, so return status: false and message", async () => {
      req = {
        user: {
          id: ""
        },
        body: {
          currentPwd: "test1",
          newPwd: "test2"
        }
      };

      passwordComparison.returns(false);
      res = await accountService.editPassword(req, res, () => {});
      expect(res.status).to.be.false;
      expect(res.message).to.equal("The current password is incorrect, please try again.");
    });

    specify("the new password is the same as the current one, then return status: false and message", async () => {
      req = {
        user: {
          id: ""
        },
        body: {
          currentPwd: "test",
          newPwd: "test"
        }
      };

      passwordComparison.returns(true);
      res = await accountService.editPassword(req, res, () => {});
      expect(res.status).to.be.false;
      expect(res.message).to.equal("The current password is the same as the new password, please try again.");
    });
  });

  after("restore stub function", () => {
    User.findByPk.restore();
    Order.findOne.restore();
    Order.findAll.restore();
    bcrypt.compareSync.restore();
  })
});