import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';
import { requireAuth } from '../middleware/require-auth';
import { validateBody } from '../middleware/validate-request';
import { createOrderSchema } from '../utils/validation-schemas';

const router = Router();

router.post('/', requireAuth, validateBody(createOrderSchema), OrderController.create);
router.get('/my-orders', requireAuth, OrderController.getMyOrders);
router.get('/number/:orderNumber', requireAuth, OrderController.getByNumber);
router.get('/:id', requireAuth, OrderController.getById);
router.post('/:id/cancel', requireAuth, OrderController.cancel);

export default router;
