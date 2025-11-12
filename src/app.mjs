import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import './core/db.mjs';
import routes from './modules/routes.mjs';

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
  .use((err, _req, res, _next) => {
    console.error(err.message);
    res.status(500).send('An error occured!');
  });

export default app;