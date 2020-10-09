import db from '../models';
import formatNumber from '../utils/numbers';

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
            price: formatNumber(price),
            description,
            image,
            type,
            quantity,
          };
        });

        return Object.assign(purchaseData, {
          amount: formatNumber(purchaseData.amount),
          deliveryCost: formatNumber(purchaseData.deliveryCost),
        });
      });

      return allPurchasesParsed;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addPurchase(newPurchase) {
    const { products } = newPurchase;

    async function addProductPurchase(items, purchase) {
      let breadPurchase;
      items.forEach(async item => {
        try {
          const product = await db.Bread.findByPk(item.id);

          if (!product) {
            throw Error(`Bread product ID not found: ${item.id}`);
          } else {
            breadPurchase = {
              PurchaseId: purchase.id,
              BreadId: item.id,
              quantity: item.quantity,
            };
          }

          return await db.BreadPurchase.create(breadPurchase);
        } catch (e) {
          console.error(e);
          return e;
        }
      });
    }

    try {
      const dbProducts = [];

      // validating products
      for (let i = 0; i < products.length; i++) {
        const item = products[i];
        const product = await db.Bread.findByPk(item.id);

        if (product) {
          dbProducts.push(product);
        } else {
          throw Error(`Bread product ID not found: ${item.id}`);
        }
      }

      // do add products purchase table record
      if (dbProducts.length !== products.length) {
        throw Error('BreadPurchase undefined couse breads does not exist in db');
      } else {
        const purchase = await db.Purchase.create(newPurchase);
        addProductPurchase(products, purchase);
        return purchase;
      }
    } catch (e) {
      console.error(e);
      throw e;
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
        breadPurchaseToDelete.forEach(breadPurchase => breadPurchase.destroy({ where: { PurchaseId: id } }));

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
