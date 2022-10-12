"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: "wishlist",
        timestamps: false,
        unique: false,
        onDelete: "SET NULL"
      });
    }
  }
  user.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const bcryptPwd = bcrypt.hashSync(value, saltRounds);
        this.setDataValue("password", bcryptPwd);
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.CHAR
    },
    address: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "User",
    freezeTableName: true
  });
  return user;
};