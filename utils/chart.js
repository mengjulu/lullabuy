const Order = require("../models").Order;
const Op = require("sequelize").Op;
let year = new Date().getFullYear();
let month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
module.exports = {
    getMonthlyData: async () => {
        let sumData = [];
        let countData = [];

        for (let m of month) {
            let sum = await Order.sum("orderSum", {
                where: {
                    paymentStatus: 1,
                    createdAt: {
                        [Op.between]: [new Date(year, month[m]), new Date(year, month[m + 1])]
                    }
                }
            });
            let count = await Order.count({
                where: {
                    paymentStatus: 1,
                    createdAt: {
                        [Op.between]: [new Date(year, month[m]), new Date(year, month[m + 1])]
                    }
                }
            });
            sumData.push(sum);
            countData.push(count);
        };
        return {
            sumData: sumData,
            countData: countData
        };
    }
};