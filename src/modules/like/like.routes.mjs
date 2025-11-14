import { Router } from 'express';
import LikeController from './like.controller.mjs';

const router = Router();

router
  .get('/', LikeController.getByUserId)
  .post('/:pokemonId', LikeController.add)
  .delete('/:pokemonId', LikeController.delete);

export default router;