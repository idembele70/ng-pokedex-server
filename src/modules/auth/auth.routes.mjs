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
import authPaths from './auth.paths.mjs';

const router = Router();

router.post(authPaths.REGISTER, registerController);
router.post(authPaths.LOGIN, loginController);
router.get(authPaths.REFRESH, refreshTokenController);
router.get(authPaths.ME, authMiddleware, meController);
router.get(authPaths.LOGOUT, logoutController);

export default router;