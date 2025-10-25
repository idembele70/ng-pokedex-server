import express from 'express';
import cors from 'cors';
import '@dotenvx/dotenvx/config';

import router from './routing/router.mjs'
import './database/db.mjs';

const { APP_PORT, CLIENT_ORIGIN } = process.env;
const app = express();

app
  .use(cors({
      origin: CLIENT_ORIGIN,
    }))
  .use(express.json());

app.use('/api/v1', router);

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status('500').send('An error occured!');
});

app.listen(APP_PORT, () => {
  console.log(`Server running on port: ${APP_PORT}`);
});