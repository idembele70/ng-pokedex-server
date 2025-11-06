import { Router } from 'express';

import {
  registerController,
  loginController,
  refreshTokenController,
} from '../controllers/auth.controllers.mjs';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshTokenController);

export default router;