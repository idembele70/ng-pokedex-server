import express from 'express';
import cors from 'cors';
import '@dotenvx/dotenvx/config';
import https from 'https';
import fs from 'fs';
import cookieParser from 'cookie-parser';

import router from './routing/router.mjs'
import './database/db.mjs';

const { APP_PORT, CLIENT_ORIGIN, NODE_ENV } = process.env;
const app = express();
let server;

app
  .use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }))
  .use(express.json())
  .use(cookieParser());

app.use('/api/v1', router);

app.use((err, _req, res, _next) => {
  console.error(err.message);
  if(err.message === 'jwt expired')
    return res.status(401).send('token expired');
  res.status(500).send('An error occured!');
});

if (NODE_ENV === 'development') {
  const key = fs.readFileSync('./config/cert/key.pem');
  const cert = fs.readFileSync('./config/cert/cert.pem');
 server = https.createServer({ key, cert }, app);
} else {
  server = app;
}

server.listen(APP_PORT, () => {
    console.log(`Server running on port: ${APP_PORT}`);
});