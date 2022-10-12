"use strict";
const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "wishlist",
        timestamps: false
      });
      this.belongsToMany(models.Order, {
        through: models.orderProduct
      });
    }
  }
  product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(women|men)/i
      }
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(robes|pajamas|others)/i
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: "Product",
    paranoid: true,
    deletedAt: "deletedAt",
    freezeTableName: true
  });
  return product;
};