const imageUrl =
  'https://www.recipetineats.com/wp-content/uploads/2020/05/No-Yeast-Sandwhich-Bread_9-1.jpg';

const breads = [
  {
    title: 'Pan de molde ',
    description: 'Pan de molde',
    type: 'molde',
    price: 2000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan de molde intergal',
    description: 'Pan de molde interga;',
    type: 'molde',
    price: 3000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan de molde son sesamo',
    description: 'Pan de molde con sesamo',
    type: 'molde',
    price: 3000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan pita',
    description: 'Pan pita normal',
    type: 'pita',
    price: 2000,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan pita aceituna',
    description: 'Pan pita con aceituna',
    type: 'pita',
    price: 2500,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pan pita integral',
    description: 'Pan pita integral',
    type: 'pita',
    price: 2500,
    image: imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Bread', breads, {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Bread', null, {});
  },
};
