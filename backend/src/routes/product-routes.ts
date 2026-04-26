import { Router } from 'express';
import { ProductController } from '../controllers/catalog-controller';

const router = Router();

router.get('/featured', ProductController.getFeatured);
router.get('/search', ProductController.search);
router.get('/slug/:slug', ProductController.getBySlug);
router.get('/:productId/related', ProductController.getRelated);
router.get('/:id', ProductController.getById);
router.get('/', ProductController.getMany);

export default router;
