import { Router } from 'express';
import { getHealth } from './health.controllers.mjs';

const router = Router();

router.get('/', getHealth);

export default router;