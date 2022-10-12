module.exports = {
    async up(queryInterface, Sequelize) {

        // User <-> orders
        await queryInterface.addColumn(
            "Order", "userId", {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: "User",
                    key: "id"
                }
            }
        );

        // Orders <-> products (through orderProduct)
        await queryInterface.addColumn(
            "orderProducts", "productId", {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: "Product",
                    key: "id"
                }
            }
        );

        await queryInterface.addColumn(
            "orderProducts", "orderId", {
                type: Sequelize.DataTypes.CHAR,
                references: {
                    model: "Order",
                    key: "orderNumber"
                }
            });


        // Users <-> products (wishlist)

        await queryInterface.createTable(
            "wishlist", {
                productId: {
                    type: Sequelize.DataTypes.UUID,
                    references: {
                        model: "Product",
                        key: "id"
                    }
                },
                userId: {
                    type: Sequelize.DataTypes.UUID,
                    references: {
                        model: "User",
                        key: "id"
                    },
                }
            }
        );
    },
    async down(queryInterface, Sequelize) {
        // User <-> orders
        await queryInterface.removeColumn(
            "Order", "userId"
        );

        // Orders <-> products (orderProduct)
        await queryInterface.removeColumn(
            "orderProducts", "productId"
        );
        await queryInterface.removeColumn(
            "orderProducts", "orderId"
        );

        // Users <-> products (wishlist)
        await queryInterface.dropTable(
            "wishlist"
        );
    }
};