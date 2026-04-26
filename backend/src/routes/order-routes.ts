import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';
import { requireAuth } from '../middleware/require-auth';

const router = Router();

router.post('/', requireAuth, OrderController.create);
router.get('/my-orders', requireAuth, OrderController.getMyOrders);
router.get('/number/:orderNumber', requireAuth, OrderController.getByNumber);
router.get('/:id', requireAuth, OrderController.getById);
router.post('/:id/cancel', requireAuth, OrderController.cancel);

export default router;
