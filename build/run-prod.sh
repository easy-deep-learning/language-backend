#!/usr/bin/env bash

set -ex

export USER_ID=0
export SERVER_PORT=80


docker-compose run --rm -T install-deps

docker-compose up -d mongodb
docker-compose up -d --force-recreate nodejs
docker-compose up -d nginx

docker-compose logs -f nodejs
