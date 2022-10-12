const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bcryptPwd = bcrypt.hashSync("test1234", saltRounds);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("User", [{
        id: crypto.randomUUID(),
        account: "test@test.com",
        password: bcryptPwd,
        isAdmin: false,
        firstName: "test",
        lastName: "test",
        number: "0912345678",
        address: "test"
      },
      {
        id: crypto.randomUUID(),
        account: "admin@test.com",
        password: bcryptPwd,
        isAdmin: true,
        firstName: "test",
        lastName: "test",
        number: "0912345678",
        address: "test"
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  }
};