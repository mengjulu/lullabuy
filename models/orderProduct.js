const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class orderProduct extends Model {}
    orderProduct.init({
      quantity: DataTypes.CHAR
    }, {
      sequelize,
      modelName: "orderProduct"
    });
    return orderProduct;
  };