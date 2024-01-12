#!/bin/sh

# このshellを動かす前に
# chmod +x docker_restart_local.sh
# を実行してほしい。
docker-compose down
rm -rf ./db/postgres-data
docker compose -f compose.yaml up -d --build