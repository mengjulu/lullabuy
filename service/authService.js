const client = require("../config/redis");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models").User;
const {
    generateUserJwtToken
} = require("../utils/jwtToken");
const {
    getCartCookie
} = require("../utils/cookieParser");
require("dotenv").config();

module.exports = {

    getSignupPage: (req, res, next) => {
        return {
            pageTitle: `Lullabuy: Sign up`
        }
    },

    getSigninPage: (req, res, next) => {
        return {
            pageTitle: `Lullabuy: Sign in`
        }
    },

    signup: async (req, res, next) => {

        const account = req.body.account;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const number = req.body.number;
        const user = await User.findOne({
            where: {
                account: account
            }
        });
        // Check if this account is already existed
        if (user) {
            return {
                status: false,
                message: "This email has been registered, please try again."
            };
        };
        let newUser;
        newUser = await User.create({
            id: crypto.randomUUID(),
            account: account,
            password: password,
            firstName: firstName,
            lastName: lastName,
            number: number
        });

        // Check if visitor has cart
        const cartID = getCartCookie(req);
        if (cartID) {
            // Alter cart id into user id, and set the cart to never expire in redis
            client.rename(cartID, newUser.id);
            client.persist(newUser.id);
        };

        // Generate jwt token
        const token = await generateUserJwtToken(newUser.id, newUser.isAdmin);

        return {
            status: true,
            cartID: cartID,
            token: token
        };
    },

    signin: async (req, res, next) => {

        const account = req.body.account;
        const password = req.body.password;

        const user = await User.findOne({
            where: {
                account: account
            }
        });
        // Check if this account doesn't exist
        if (!user) {
            return {
                status: false,
                message: "The user does not exist, please try again."
            }
        }
        // Check if the password is correct
        const pwdCheck = bcrypt.compareSync(password, user.password);
        if (!pwdCheck) {
            return {
                status: false,
                message: "The password is not correct, please try again."
            };
        }

        // Check if visitor has cart
        const cartID = getCartCookie(req);
        const adminStatus = user.isAdmin;

        if (cartID && !adminStatus) {
            const visitorCartProducts = await client.hgetall(cartID);
            const userCart = await client.hlen(user.id);
            // Check if the user already has cart
            if (!userCart) {
                // If not, alter cart id into user id
                client.rename(cartID, user.id);
            } else {
                // If so, add all products in visitor's cart into user's cart
                for (let [key, value] of Object.entries(visitorCartProducts)) {
                    const productCheck = await client.hget(user.id, key);
                    await productCheck ? client.hincrby(user.id, key, value) : client.hset(user.id, key, value);
                }
            };
            // set the cart to never expire in redis
            client.persist(user.id);
        };

        // Generate jwt token
        const token = await generateUserJwtToken(user.id, adminStatus);
        const tokenType = adminStatus ? "adminJwtToken" : "jwtToken";
        return {
            status: true,
            tokenType: tokenType,
            token: token,
            cartID: cartID
        };
    }
};