#!/usr/bin/env bash

set -ex

export USER_ID=$(id -u)
export SERVER_PORT=8000


docker-compose run --rm -T install-deps

docker-compose up -d mongodb
docker-compose up -d nodejs
docker-compose up -d nginx

docker-compose logs -f
