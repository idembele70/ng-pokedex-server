import { Router } from 'express';
import PokemonController from './pokemon.controller.mjs';

const router = Router();

router
  .get('/', PokemonController.getAll)
  .get('/search', PokemonController.filterAll);

export default router