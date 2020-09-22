'use strict';

const imageUrl =
  'https://www.recipetineats.com/wp-content/uploads/2020/05/No-Yeast-Sandwhich-Bread_9-1.jpg';

const breads = [
  {
    title: 'Pan de molde ',
    description: 'Pan de molde',
    type: 'Molde',
    price: 2000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan de molde son sesamo',
    description: 'Pan de molde con sesamo dulce',
    type: 'Molde',
    price: 3000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan de molde son sesamo',
    description: 'Pan de molde con sesamo tostado',
    type: 'Molde',
    price: 3000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan pita',
    description: 'Pan pita',
    type: 'Pita',
    price: 2000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bread', breads, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bread', null, {});
  },
};
