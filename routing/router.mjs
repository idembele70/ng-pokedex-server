import { Router } from 'express'

import healthCheckRouter from './health-check.routes.mjs';
import pokemonRouter from './pokemon.routes.mjs';
import authRouter from './auth.routes.mjs';

const router = Router();

router.use('/health', healthCheckRouter);
router.use('/pokemons', pokemonRouter);
router.use('/auth', authRouter);

export default router;