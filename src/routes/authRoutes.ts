import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { registerSchema, loginSchema } from '../schemas';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;
