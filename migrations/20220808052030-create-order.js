"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
      orderNumber: {
        type: Sequelize.DataTypes.CHAR,
        allowNull: false,
        primaryKey: true
      },
      orderSum: {
        type: Sequelize.DataTypes.CHAR,
        defaultValue: 0,
        allowNull: false
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.DataTypes.CHAR,
        defaultValue: 2,
        allowNull: false,
        validate: {
          is: /(1|2|3)/i
        },
        get() {
          const rawValue = this.getDataValue("paymentStatus");
          return rawValue == 1 ? "Paid" :
          rawValue == 2 ? "Outstanding" :  "Canceled"
         }
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
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Order");
  }
};