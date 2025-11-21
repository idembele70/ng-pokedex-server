const { loadEnvFile } = require('node:process');

loadEnvFile('.env');
const {
  PROTOCOL,
  HOST,
  MONGO_DOCKER_PORT,
  DB_NAME,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD,
  MONGO_AUTH_SOURCE,
} = process.env;
const uri = `${PROTOCOL}//${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${HOST}:${MONGO_DOCKER_PORT}/${DB_NAME}?authSource=${MONGO_AUTH_SOURCE}`;

const db = connect(uri);

db.pokemons.drop();

const pokemons = require('./pokemons.json');

const startTime = Date.now();
console.log('start inserting data...');
db.pokemons.insertMany(pokemons);

console.log(`Data inserted in ${Date.now() - startTime}ms`);
