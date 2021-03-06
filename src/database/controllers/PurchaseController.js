import axios from 'axios';
import nanoid from 'nanoid';

import PurchaseService from '../services/PurchaseService';
import RestResponses from '../utils/RestResponses';
import formatNumber from '../utils/numbers';
import createPurchaseMissingParamsMessage from '../utils/strings';

const RR = new RestResponses();

const EMAIL_API_URL = process.env.EMAIL_API_URL;
const DEV_EMAIL_API_URL = process.env.DEV_EMAIL_API_URL;
const API_VERSION = process.env.API_VERSION;

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
    if (
      !req.body.email ||
      !req.body.amount ||
      !req.body.deliveryDate ||
      !req.body.clientName ||
      !req.body.address ||
      !req.body.phone ||
      !req.body.products ||
      !req.body.products.length === 0 ||
      !req.body.paymentType ||
      req.body.deliveryCost === undefined
    ) {
      RR.setError(400, createPurchaseMissingParamsMessage(req.body));
      return RR.send(res);
    }

    let productValidated = true;
    req.body.products.forEach(product => {
      if (!product.id || !product.quantity || !product.name || !product.totalAmount) {
        productValidated = false;
      }
    });

    if (!productValidated) {
      RR.setError(400, 'Please provide complete products details');
      return RR.send(res);
    }

    const newPurchase = req.body;
    // create purcharse order number
    newPurchase.orderNumber = nanoid(6);

    try {
      const createdPurchase = await PurchaseService.addPurchase(newPurchase);
      const {
        email,
        clientName,
        phone,
        deliveryDate,
        address,
        products,
        amount,
        paymentType,
        deliveryCost,
        orderNumber,
      } = newPurchase;

      const emailParams = {
        email,
        userName: clientName,
        orderNumber,
        phoneNumber: phone,
        totalAmount: formatNumber(amount),
        paymentType,
        deliveryCost,
        deliveryDate,
        address,
        products,
      };
      const EMAIL_URL = process.env.NODE_ENV === 'development' ? DEV_EMAIL_API_URL : EMAIL_API_URL;

      const emailSent = await axios.post(`${EMAIL_URL}${API_VERSION}/email`, emailParams);
      const responseData = {
        createdPurchase,
        email: emailSent.data,
      };

      RR.setSuccess(201, 'Purchase Added!', responseData);
      return RR.send(res);
    } catch (e) {
      const msj = e.response && e.response.data && e.response.data.message ? e.response.data.message : e.message;
      console.error('msj', msj);
      RR.setError(400, msj);
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
