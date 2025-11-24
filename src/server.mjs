import '@dotenvx/dotenvx/config';
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import app from './app.mjs';
import { env } from './config/env.mjs';

const { APP_PORT } = env;

  const certFolderURL = ['src', 'config', 'cert'];
  const certExt = '.pem';
  const key = fs.readFileSync(path.resolve(...certFolderURL, `key${certExt}`));
  const cert = fs.readFileSync(path.resolve(...certFolderURL, `cert${certExt}`));
  const server = https.createServer({ key, cert }, app);

server.listen(APP_PORT, () => {
  console.log(`Server running on port: ${APP_PORT}`);
});