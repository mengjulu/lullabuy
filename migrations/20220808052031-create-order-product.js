module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orderProducts", {
            // Every quantity of purchased product
            quantity: {
                type: Sequelize.DataTypes.CHAR
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
        await queryInterface.dropTable("orderProducts");
    }
};