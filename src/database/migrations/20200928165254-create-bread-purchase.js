module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BreadPurchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PurchaseId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Purchases',
          key: 'id',
        },
      },
      BreadId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Bread',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('BreadPurchases');
  },
};
