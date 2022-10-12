const ecpay = require("../config/ecpay");
const Order = require("../models").Order;

require("dotenv").config();

const randomValue = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};
const getTimeFormat = () => {
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return [date.getFullYear(), "/" +
        (mm > 9 ? "" : "0") + mm, "/" +
        (dd > 9 ? "" : "0") + dd, " " +
        (hh > 9 ? "" : "0") + hh, ":" +
        (mi > 9 ? "" : "0") + mi, ":" +
        (ss > 9 ? "" : "0") + ss
    ].join("");
};

const getECpayData = async (orderNumber, orderItems = []) => {
    const order = await Order.findByPk(orderNumber);
    const productDetails = await order.getProducts({
        joinTableAttributes: ["quantity"],
        paranoid: false
    });
    // Transfer product information to ECpay accepted format
    productDetails.forEach(p => {
        orderItems.push(`#${p.name} * ${p.orderProduct.quantity}`);
    });
    return {
        merchantTradeNo: orderNumber + "LU" + randomValue(10, 990),
        orderSum: order.orderSum,
        orderItems: orderItems
    };
};

const getECpayPage = async (orderNumber) => {
    const orderInfo = await getECpayData(orderNumber);
    let base_param = {
        MerchantTradeNo: `${orderInfo.merchantTradeNo}`,
        MerchantTradeDate: getTimeFormat(),
        TotalAmount: `${orderInfo.orderSum}`,
        TradeDesc: "For lullabuy project test only",
        ItemName: `${orderInfo.orderItems}`,
        PaymentInfoURL: `${process.env.MAIN_DOMAIN}/payment`,
        ReturnURL: `${process.env.MAIN_DOMAIN}/payment/callback`,
        OrderResultURL: `${process.env.MAIN_DOMAIN}/payment/${orderNumber}`,
        EncryptType: 1
    };

    let paymentPage = ecpay.payment_client.aio_check_out_credit_onetime(parameters = base_param);
    return paymentPage;
};

module.exports = getECpayPage;