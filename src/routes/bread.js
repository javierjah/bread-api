import { Router } from 'express';

import BreadController from '../database/controllers/BreadController';

const router = Router();

router.get('/', BreadController.getAllBreads);
router.post('/', BreadController.addBread);
router.get('/:id', BreadController.getABread);
router.put('/:id', BreadController.updatedBread);
router.delete('/:id', BreadController.deleteBread);

export default router;
