#!/bin/sh

sudo rm -rf db
docker-compose down --rmi all --volumes --remove-orphans
docker-compose -f compose.prod.yaml up -d --build