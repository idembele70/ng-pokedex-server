import { Router } from 'express';
import LikeController from './like.controller.mjs';
import { authMiddleware } from '../../core/middleware/auth.middleware.mjs';

const router = Router();

router
  .post('/:pokemonId', authMiddleware, LikeController.add)
  .delete('/:pokemonId', authMiddleware, LikeController.delete);

export default router;