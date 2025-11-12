import { Router } from 'express';
import PokemonControllers from './pokemon.controllers.mjs';

const router = Router();

router
  .get('/', PokemonControllers.getAll)
  .get('/search', PokemonControllers.filterAll);

export default router