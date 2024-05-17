#!/bin/sh
git fetch origin && git reset --hard origin/develop && git clean -f -d && \
docker compose -f docker-compose.develop.yml down && \
docker compose -f docker-compose.develop.yml pull && \
SET GATEWAY_PORT=8124 docker compose -f docker-compose.develop.yml up -d;