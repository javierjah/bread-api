import PurchaseService from '../services/PurchaseService';
import RestResponses from '../utils/RestResponses';

const RR = new RestResponses();

class PurchaseController {
  static async getAllPurchases(req, res) {
    try {
      const allPurchases = await PurchaseService.getAllPurchases();
      if (allPurchases.length > 0) {
        RR.setSuccess(200, 'Purchases retrieved', allPurchases);
      } else {
        RR.setSuccess(200, 'No purchases found');
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error);
      return RR.send(res);
    }
  }

  static async addPurchase(req, res) {
    console.log('req.body', req.body);
    if (
      !req.body.amount ||
      !req.body.description ||
      !req.body.deliveryDate ||
      !req.body.clientName ||
      !req.body.address ||
      !req.body.phone ||
      !req.body.products ||
      !req.body.products.length === 0
    ) {
      RR.setError(400, 'Please provide complete details');
      return RR.send(res);
    }

    const newPurchase = req.body;
    try {
      const createdPurchase = await PurchaseService.addPurchase(newPurchase);
      RR.setSuccess(201, 'Purchase Added!', createdPurchase);
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error.message);
      return RR.send(res);
    }
  }

  static async deletePurchase(req, res) {
    const { id } = req.params;

    if (!id) {
      RR.setError(400, 'Please provide a numeric value');
      return RR.send(res);
    }

    try {
      const purchaseToDelete = await PurchaseService.deletePurchase(String(id));

      if (purchaseToDelete) {
        RR.setSuccess(200, 'Purchase deleted');
      } else {
        RR.setError(404, `Purchase with the id ${id} cannot be found`);
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error);
      return RR.send(res);
    }
  }
}

export default PurchaseController;
