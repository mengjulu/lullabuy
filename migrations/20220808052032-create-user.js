"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      account: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        set(value) {
          const bcryptPwd = bcrypt.hashSync(value, saltRounds);
          this.setDataValue("password", bcryptPwd);
        }
      },
      isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      firstName: {
        type: Sequelize.DataTypes.STRING
      },
      lastName: {
        type: Sequelize.DataTypes.STRING
      },
      number: {
        type: Sequelize.DataTypes.CHAR
      },
      address: {
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date()
      }
    });

    await queryInterface.addConstraint("User", {
      fields: ["account"],
      type: "unique",
      name: "account"
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User");
  }
};