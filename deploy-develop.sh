#!/bin/sh
git fetch origin && git reset --hard origin/develop && git clean -f -d && \
docker compose -f docker-compose.develop.yml down && \
docker rmi -f $(docker images -aq) && \
docker compose -f docker-compose.develop.yml pull && \
docker compose -f docker-compose.develop.yml --env-file .env.staging up -d;