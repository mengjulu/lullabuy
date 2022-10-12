const randomValue = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
const orderNumber = randomValue(10, 99) + Date.now() + randomValue(10, 99);
module.exports = {
  async up(queryInterface, Sequelize) {

    const userID = await queryInterface.rawSelect("User", {
      where: {
        account: "test@test.com",
      },
    }, ["id"]);

    const productID = await queryInterface.rawSelect("Product", {
      where: {
        name: "test-product-1",
      },
    }, ["id"]);

    await queryInterface.bulkInsert("Order", [{
      orderNumber: orderNumber,
      orderSum: 110,
      firstName: "test",
      lastName: "test",
      number: "0912345678",
      email: "test@test.com",
      address: "test",
      paymentStatus: 2,
      userId: userID
    }]);

    await queryInterface.bulkInsert("orderProducts", [{
      quantity: 1,
      productId: productID,
      orderId: orderNumber
    }]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orderProducts", null, {});
    await queryInterface.bulkDelete("Order", null, {});
  }
};