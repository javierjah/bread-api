const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BreadPurchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // associate(models)
    static associate() {
      // define association here
    }
  }
  BreadPurchase.init(
    {
      PurchaseId: DataTypes.INTEGER,
      BreadId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'BreadPurchase',
    },
  );
  return BreadPurchase;
};
