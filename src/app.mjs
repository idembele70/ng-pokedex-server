import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

import './core/db.mjs';
import routes from './modules/routes.mjs';
const require = createRequire(import.meta.url)
const swaggerFile = require('./docs/swagger-output.json');

const { CLIENT_ORIGIN } = process.env;
const app = express();

app
  .use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }))
  .use(express.json())
  .use(cookieParser())
  .use('/api/v1', routes)
  .use((err, req, res, _next) => {
    if (err.message === 'jwt expired' && req.url !== '/api/v1/auth/refresh') {
      res.status(401).send(err.message);
    } else {
      console.error(err.message);
      res.status(500).send('An error occurred!');
    }
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;