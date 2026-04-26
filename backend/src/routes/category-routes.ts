import { Router } from 'express';
import { CategoryController } from '../controllers/catalog-controller';

const router = Router();

router.get('/', CategoryController.getAll);
router.get('/slug/:slug', CategoryController.getBySlug);
router.get('/:id', CategoryController.getById);

export default router;
