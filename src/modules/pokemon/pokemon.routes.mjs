import { Router } from 'express';
import PokemonController from './pokemon.controller.mjs';
import { authMiddleware } from '../../core/middleware/auth.middleware.mjs';

const router = Router();

router
  .get('/', PokemonController.getAll)
  .get('/search', PokemonController.filterAll)
  .get('/likes', authMiddleware, PokemonController.filterLiked);

export default router;