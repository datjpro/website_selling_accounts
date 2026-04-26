import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { requireAuth } from '../middleware/require-auth';
import { validateBody } from '../middleware/validate-request';
import { changePasswordSchema, loginSchema, registerSchema, updateProfileSchema } from '../utils/validation-schemas';

const router = Router();

router.post('/login', validateBody(loginSchema), AuthController.login);
router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/logout', AuthController.logout);
router.get('/me', requireAuth, AuthController.me);
router.put('/profile', requireAuth, validateBody(updateProfileSchema), AuthController.updateProfile);
router.post('/change-password', requireAuth, validateBody(changePasswordSchema), AuthController.changePassword);

export default router;
