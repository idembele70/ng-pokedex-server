import { Router } from 'express';

import {
  registerController,
  loginController,
  refreshTokenController,
  meController,
  logoutController,
} from './auth.controllers.mjs';
import {
  authMiddleware,
} from '../../core/middleware/auth.middleware.mjs';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/refresh', refreshTokenController);
router.get('/me', authMiddleware, meController);
router.get('/logout', logoutController);

export default router;