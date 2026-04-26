import { Router } from 'express';
import { PromotionController } from '../controllers/promotion-controller';
import { validateBody } from '../middleware/validate-request';
import { promotionValidateSchema } from '../utils/validation-schemas';

const router = Router();

router.get('/', PromotionController.getAll);
router.get('/active', PromotionController.getActive);
router.post('/validate', validateBody(promotionValidateSchema), PromotionController.validate);

export default router;
