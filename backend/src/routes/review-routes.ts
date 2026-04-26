import { Router } from 'express';
import { ReviewController } from '../controllers/catalog-controller';

const router = Router();

router.get('/product/:productId', ReviewController.getProductReviews);
router.post('/', ReviewController.create);
router.post('/:reviewId/helpful', ReviewController.markHelpful);

export default router;
