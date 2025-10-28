import { Router } from 'express';
import { healthCheckController } from '../controllers/health-check.controllers.mjs';

const router = Router();

router.get('/', healthCheckController);

export default router;