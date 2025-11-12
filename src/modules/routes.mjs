import { Router } from 'express'

import healthRoutes from '../core/health/health.routes.mjs';
import pokemonRoutes from './pokemon/pokemon.routes.mjs';
import authRoutes from './auth/auth.routes.mjs';

const router = Router();

router
  .use('/health', healthRoutes)
  .use('/pokemons', pokemonRoutes)
  .use('/auth', authRoutes);

export default router;