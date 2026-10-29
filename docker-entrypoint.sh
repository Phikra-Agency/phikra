#!/bin/sh
set -eu

mkdir -p /data

# Seed an empty schema DB on first boot. Persistent Coolify volume keeps
# subsequent contact submissions across deploys.
if [ ! -f /data/custom.db ]; then
  cp /app/prisma/custom.db /data/custom.db
fi

exec node server.js
