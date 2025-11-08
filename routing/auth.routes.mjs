import { Router } from 'express';

import {
  registerController,
  loginController,
  refreshTokenController,
  meController,
} from '../controllers/auth.controllers.mjs';
import {
  authMiddleware,
} from '../middleware/auth.middleware.mjs';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/refresh', refreshTokenController);
router.get('/me', authMiddleware, meController);

export default router;