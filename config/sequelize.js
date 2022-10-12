require("dotenv").config();
const user = process.env.MYSQL_USER || "root";
const host = process.env.MYSQL_HOST || "127.0.0.1";

module.exports = {
    "development": {
        "username": user,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DEV_NAME,
        "host": host,
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": user,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_TEST_NAME,
        "host": host,
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "username": user,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_PRODUCTION_NAME,
        "host": host,
        "dialect": "mysql",
        "logging": false
    }
};