import db from '../models';

class PurchaseService {
  static async getAllPurchases() {
    try {
      const allPurchases = await db.Purchase.findAll({
        include: [
          {
            model: db.Bread,
            as: 'Bread',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            attributes: ['id', 'title', 'price', 'description', 'image', 'type'],
            through: {
              // This block of code allows you to retrieve the properties of the join table
              model: db.BreadPurchases,
              as: 'BreadPurchases',
              attributes: ['quantity'],
            },
          },
        ],
      });

      const allPurchasesParsed = allPurchases.map(purchase => {
        const purchaseData = purchase.get({ pain: true });
        purchaseData.Bread = purchaseData.Bread.map(bread => {
          const breadData = bread.get({ pain: true });
          const breadPurchasesData = breadData.BreadPurchases.get({ pain: true });

          const { quantity } = breadPurchasesData;
          const { id, title, price, description, image, type } = breadData;
          return {
            id,
            title,
            price,
            description,
            image,
            type,
            quantity,
          };
        });

        return purchaseData;
      });

      return allPurchasesParsed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addPurchase(newPurchase) {
    const { products } = newPurchase;

    try {
      const purchase = await db.Purchase.create(newPurchase);

      products.forEach(async item => {
        const product = await db.Bread.findByPk(item.id);

        if (!product) {
          return Error('Bread Not found: ', product);
        }

        const breadPurchase = {
          PurchaseId: purchase.id,
          BreadId: item.id,
          quantity: item.quantity,
        };

        const some = await db.BreadPurchase.create(breadPurchase);
        return some;
      });

      return purchase;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deletePurchase(id) {
    try {
      const purchaseToDelete = await db.Purchase.findOne({ where: { id } });
      const breadPurchaseToDelete = await db.BreadPurchase.findAll({
        where: { PurchaseId: id },
      });

      if (purchaseToDelete && breadPurchaseToDelete) {
        // removing the breadPurchases in the table association
        breadPurchaseToDelete.forEach(breadPurchase =>
          breadPurchase.destroy({ where: { PurchaseId: id } }),
        );

        // removing the purchase
        const deletedPurchase = await db.Purchase.destroy({ where: { id } });

        return deletedPurchase;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default PurchaseService;
