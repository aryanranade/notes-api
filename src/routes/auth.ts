import { Router } from 'express';
import { register, login, refresh, registerSchema, loginSchema } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh', refresh);

export default router;
