import { Router } from 'express';
import { AdminController } from '../controllers/admin-controller';
import { requireAuth } from '../middleware/require-auth';
import { requireAdmin } from '../middleware/require-admin';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/users', AdminController.listUsers);
router.post('/categories', AdminController.createCategory);
router.put('/categories/:id', AdminController.updateCategory);
router.delete('/categories/:id', AdminController.deleteCategory);
router.post('/products', AdminController.createProduct);
router.put('/products/:id', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);
router.post('/promotions', AdminController.createPromotion);
router.put('/promotions/:id', AdminController.updatePromotion);
router.delete('/promotions/:id', AdminController.deletePromotion);
router.put('/orders/:id/status', AdminController.updateOrderStatus);

export default router;
