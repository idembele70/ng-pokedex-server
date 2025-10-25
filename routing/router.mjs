import { Router } from 'express'

import healthCheckRouter from './health-check.routing.mjs';

const router = Router();

router.use('/health', healthCheckRouter);

export default router;