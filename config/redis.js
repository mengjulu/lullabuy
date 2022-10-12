const redis = require("redis");
require("dotenv").config();
const host = process.env.REDIS_HOST || "127.0.0.1";

const client = redis.createClient({
    url: `redis://${host}:6379`
});
client.on("error", (err) => console.log("Redis Client Error: ", err));
client.connect();

module.exports = client;