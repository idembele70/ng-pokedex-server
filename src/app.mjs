import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createRequire } from 'node:module';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.mjs';
import './core/db.mjs';
import routes from './modules/routes.mjs';
import AUTH_PATHS from './modules/auth/auth.paths.mjs';
const require = createRequire(import.meta.url)
const swaggerFile = require('./docs/swagger-output.json');

const { CLIENT_ORIGIN, BASE_URL } = env;
const app = express();

app
  .use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }))
  .use(express.json())
  .use(cookieParser())
  .use(BASE_URL, routes)
  .use((err, req, res, _next) => {
    if (
      err.message === 'jwt expired' &&
      req.url !== `${BASE_URL}${AUTH_PATHS.BASE_PATH}${AUTH_PATHS.REFRESH}`
    ) {
      res.status(401).send(err.message);
    } else {
      console.error(err.message);
      res.status(500).send('An error occurred!');
    }
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;