const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const expect = require("chai").expect;
const authService = require("../service/authService");
const bcrypt = require("bcrypt");
const client = require("../config/redis");
const User = require("../models").User;
const cartMockID = "00000000-0000-0000-0000-000000000000";

let req;
let res;
let user;
let passwordComparison;

describe("Auth service", () => {

    before("stub config", () => {
        sinon.stub(client, "hget").returns();
        sinon.stub(client, "hincrby").returns();
        sinon.stub(client, "hset").returns();
        sinon.stub(client, "persist").returns();
        sinon.stub(client, "hgetall").returns();
        sinon.stub(client, "hlen").returns();
        sinon.stub(client, "rename").returns();
        sinon.stub(jwt, "sign").returns("testToken");
        sinon.stub(User, "create").returns({
            id: "test",
            isAdmin: false
        });
        user = sinon.stub(User, "findOne");
        passwordComparison = sinon.stub(bcrypt, "compareSync").returns(true);
    });

    context("Sign up:", () => {
        specify("should return page title for sign up page.", () => {
            res = authService.getSignupPage(req, res, () => {});
            expect(res.pageTitle).to.equal("Lullabuy: Sign up");
        });

        specify("should create a new account and return status: true, cartID and token.", async () => {
            req = {
                body: {
                    account: "",
                    password: "",
                    name: "",
                    number: "",
                    address: ""
                },
                headers: {
                    cookie: `cartID=${cartMockID}`
                }
            };

            res = await authService.signup(req, res, () => {});
            expect(res.status).to.be.true;
            expect(res.cartID).to.equal(cartMockID);
            expect(res.token).to.equal("testToken");
        });

        specify("should return status: false and message due to the account is taken.", async () => {
            req = {
                body: {
                    account: "",
                    password: "",
                    name: "",
                    number: "",
                    address: ""
                },
                headers: {
                    cookie: `cartID=${cartMockID}`
                }
            };
            user.returns(true);
            res = await authService.signup(req, res, () => {});
            expect(res.status).to.be.false;
            expect(res.message).to.be.a("string");
        });
    });

    context("Sign in:", () => {
        req = {
            body: {
                account: "",
                password: "",
                name: "",
                number: "",
                address: ""
            },
            headers: {
                cookie: `cartID=${cartMockID}`
            }
        };

        specify("should return page title for sign in page.", () => {
            res = authService.getSigninPage(req, res, () => {});
            expect(res.pageTitle).to.equal("Lullabuy: Sign in");
        });

        specify("should find out the user and return status: true, tokenType: jwtToken, cartID and token.", async () => {
            user.returns({
                id: "",
                password: "",
                isAdmin: false
            });

            res = await authService.signin(req, res, () => {});
            expect(res.status).to.be.true;
            expect(res.tokenType).to.equal("jwtToken");
            expect(res.cartID).to.equal(cartMockID);
            expect(res.token).to.equal("testToken");
        });

        specify("should find out the user and return status: true, tokenType: adminJwtToken, cartID and token.", async () => {
            user.returns({
                id: "",
                password: "",
                isAdmin: true
            });

            res = await authService.signin(req, res, () => {});
            expect(res.status).to.be.true;
            expect(res.tokenType).to.equal("adminJwtToken");
            expect(res.cartID).to.equal(cartMockID);
            expect(res.token).to.equal("testToken");
        });

        specify("should return status: false and message due to the user isn't existed.", async () => {
            user.returns();

            res = await authService.signin(req, res, () => {});
            expect(res.status).to.be.false;
            expect(res.message).to.equal("The user does not exist, please try again.");
        });

        specify("should return status: false and message due to the password entered isn't correct.", async () => {
            user.returns(true);
            passwordComparison.returns(false);

            res = await authService.signin(req, res, () => {});
            expect(res.status).to.be.false;
            expect(res.message).to.equal("The password is not correct, please try again.");
        });
    });

    after("restore stub function", () => {
        User.findOne.restore();
        User.create.restore();
        jwt.sign.restore();
        client.hget.restore();
        client.hincrby.restore();
        client.hset.restore();
        client.persist.restore();
        client.hgetall.restore();
        client.hlen.restore();
        client.rename.restore();
    });
});