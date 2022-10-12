const ecpay_aio_nodejs = require("ecpay_aio_nodejs");
require("dotenv").config();
const options = {
  "OperationMode": "Test",
  "MercProfile": {
    "MerchantID": process.env.ECPAY_MERCHANTID,
    "HashKey": process.env.ECPAY_HASHKEY,
    "HashIV": process.env.ECPAY_HASHIV
  },
  "IgnorePayment": [],
  "IsProjectContractor": false
};
const ecpay = new ecpay_aio_nodejs(options);
module.exports = ecpay;