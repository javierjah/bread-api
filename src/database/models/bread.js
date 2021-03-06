const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bread.belongsToMany(models.Purchase, {
        through: 'BreadPurchases',
      });
    }
  }
  Bread.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bread',
    },
  );
  return Bread;
};
