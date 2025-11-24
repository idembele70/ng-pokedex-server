console.log('Starting running script');
pokemons = require('/docker-entrypoint-initdb.d/pokemons.json');

// https://hub.docker.com/_/mongo#initializing-a-fresh-instance
// use the database specified by the MONGO_INITDB_DATABASE
db.pokemons.insertMany(pokemons);