module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Purchases', 'orderNumber', Sequelize.STRING);
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Purchases', 'orderNumber');
  },
};
