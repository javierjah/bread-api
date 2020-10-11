const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsToMany(models.Bread, {
        through: 'BreadPurchases',
      });
    }
  }
  Purchase.init(
    {
      description: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      deliveryDate: DataTypes.DATE,
      clientName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      paymentType: DataTypes.STRING,
      deliveryCost: DataTypes.INTEGER,
      orderNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Purchase',
    },
  );
  return Purchase;
};
