import { Router } from 'express';

import healthRoutes from '../core/health/health.routes.mjs';
import authRoutes from './auth/auth.routes.mjs';
import likeRoutes from './like/like.routes.mjs';
import pokemonRoutes from './pokemon/pokemon.routes.mjs';
import { authMiddleware } from '../core/middleware/auth.middleware.mjs';
import AUTH_PATHS from './auth/auth.paths.mjs';

const router = Router();

router
  .use('/health', healthRoutes)
  .use('/pokemons', pokemonRoutes)
  .use(AUTH_PATHS.BASE_PATH, authRoutes)
  .use('/likes', authMiddleware, likeRoutes);

export default router;