import { Router } from 'express';
import {
  getAllPokemons,
} from '../controllers/pokemon.controllers.mjs';

const router = Router();

router.get('/', getAllPokemons)

export default router