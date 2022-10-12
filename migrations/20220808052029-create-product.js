"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /(women|men)/i
        }
      },
      subcategory: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /(robes|pajamas|others)/i
        }
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      stock: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT
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
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE
      }
    }, {
      paranoid: true
    });

    await queryInterface.addConstraint("Product", {
      fields: ["name"],
      type: "unique",
      name: "name"
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Product", "name");
    await queryInterface.dropTable("Product");
  }
};