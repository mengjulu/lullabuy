const Redis = require("ioredis");
require("dotenv").config();
const host = process.env.REDIS_HOST || "127.0.0.1";
const port = process.env.REDIS_PORT || 6379;
const redisUrl = process.env.REDIS_URL || `redis://${host}:${port}`;
const client = new Redis(redisUrl);

module.exports = client;