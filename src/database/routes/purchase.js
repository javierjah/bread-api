import { Router } from 'express';

import PurchaseController from '../controllers/PurchaseController';

const router = Router();

router.get('/', PurchaseController.getAllPurchases);
router.post('/', PurchaseController.addPurchase);
router.delete('/:id', PurchaseController.deletePurchase);

export default router;
