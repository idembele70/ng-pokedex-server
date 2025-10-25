import { Router } from 'express';
import { healthCheckController } from '../controllers/health-check.controller.mjs';

const router = Router();

router.get('/', healthCheckController);

export default router;