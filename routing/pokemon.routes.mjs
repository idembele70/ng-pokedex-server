import { Router } from 'express';
import {
  searchPokemons,
} from '../controllers/pokemon.controllers.mjs';

const router = Router();

router.get('/search', searchPokemons)

export default router