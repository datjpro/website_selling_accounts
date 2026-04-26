import { Router } from 'express';
import { ReviewController } from '../controllers/catalog-controller';
import { validateBody, validateParams } from '../middleware/validate-request';
import { createReviewSchema, markHelpfulSchema } from '../utils/validation-schemas';

const router = Router();

router.get('/product/:productId', ReviewController.getProductReviews);
router.post('/', validateBody(createReviewSchema), ReviewController.create);
router.post('/:reviewId/helpful', validateParams(markHelpfulSchema), ReviewController.markHelpful);

export default router;
