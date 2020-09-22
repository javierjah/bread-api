'use strict';

const breads = [
  {
    title: 'Pan de molde ',
    description: 'Pan de molde',
    type: 'Molde',
    price: 2000,
  },
  {
    title: 'Pan de molde son sesamo',
    description: 'Pan de molde con sesamo dulce',
    type: 'Molde',
    price: 3000,
  },
  {
    title: 'Pan de molde son sesamo',
    description: 'Pan de molde con sesamo tostado',
    type: 'Molde',
    price: 3000,
  },
  {
    title: 'Pan pita',
    description: 'Pan pita',
    type: 'Pita',
    price: 2000,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Breads', breads, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Breads', null, {});
  },
};
