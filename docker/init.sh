set -e

mongoimport \
  --db "${MONGO_INITDB_DATABASE}" \
  --collection "pokemons" \
  --file "/docker-entrypoint-initdb.d/pokemons.json" \
  --jsonArray