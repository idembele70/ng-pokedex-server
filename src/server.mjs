import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path'
import '@dotenvx/dotenvx/config';
import app from './app.mjs'

const { APP_PORT, NODE_ENV } = process.env;
let server;

if (NODE_ENV === 'development') {
  const certFolderURL = ['src', 'config', 'cert'];
  const certExt = '.pem';
  const key = fs.readFileSync(path.resolve(...certFolderURL, `key${certExt}`));
  const cert = fs.readFileSync(path.resolve(...certFolderURL, `cert${certExt}`));
  server = https.createServer({ key, cert }, app);
} else {
  server = app;
}

server.listen(APP_PORT, () => {
  console.log(`Server running on port: ${APP_PORT}`);
});