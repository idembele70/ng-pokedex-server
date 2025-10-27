set -e

mongosh <<EOF
use ${DB_NAME}
db.createCollection("pokemons")
EOF

mongoimport \
  --db "${DB_NAME}" \
  --collection "pokemons" \
  --file "/docker-entrypoint-initdb.d/pokemons.json" \
  --jsonArray