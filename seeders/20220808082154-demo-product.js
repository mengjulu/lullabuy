"use strict";
const crypto = require("crypto");
const fs = require("fs");
let num = 0;
const createImgPath = () => {
  let fileName = `test-${++num}`;
  fs.copyFileSync("./public/image/shopping-bag.svg", `./public/image/product/${fileName}.svg`);
  return `/static/image/product/${fileName}.svg`;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Product", [{
        id: crypto.randomUUID(),
        name: "test-product-1",
        category: "women",
        subcategory: "robes",
        price: "110",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-2",
        category: "women",
        subcategory: "pajamas",
        price: "130",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-3",
        category: "women",
        subcategory: "others",
        price: "150",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-4",
        category: "men",
        subcategory: "robes",
        price: "140",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-5",
        category: "men",
        subcategory: "pajamas",
        price: "180",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-6",
        category: "men",
        subcategory: "others",
        price: "200",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-7",
        category: "women",
        subcategory: "robes",
        price: "150",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-8",
        category: "women",
        subcategory: "pajamas",
        price: "110",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-9",
        category: "women",
        subcategory: "others",
        price: "200",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-10",
        category: "men",
        subcategory: "robes",
        price: "155",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-11",
        category: "men",
        subcategory: "pajamas",
        price: "190",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
      {
        id: crypto.randomUUID(),
        name: "test-product-12",
        category: "men",
        subcategory: "others",
        price: "210",
        stock: "100",
        imageUrl: createImgPath(),
        description: "test"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Product", null, {});

  }
};