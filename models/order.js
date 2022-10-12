'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        static associate(models) {
            this.belongsTo(models.User);
            this.belongsToMany(models.Product, {
                through: models.orderProduct,
                foreignKey: "orderId"
            });

        }
    }
    order.init({
        orderNumber: {
            type: DataTypes.CHAR,
            allowNull: false,
            primaryKey: true
        },
        orderSum: {
            type: DataTypes.CHAR,
            defaultValue: 0,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentStatus: {
            type: DataTypes.CHAR,
            defaultValue: 2,
            allowNull: false,
            validate: {
                is: /(1|2|3)/
            },
            get() {
                const rawValue = this.getDataValue("paymentStatus");
                return rawValue == 1 ? "Paid" :
                    rawValue == 2 ? "Outstanding" : "Canceled";
            }
        },
    }, {
        sequelize,
        modelName: "Order",
        freezeTableName: true
    });
    return order;
};