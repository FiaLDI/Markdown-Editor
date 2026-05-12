#!/usr/bin/env bash

set -euo pipefail

CONFIRM="${1:-}"

if [ "$CONFIRM" != "--yes" ]; then
  echo "This script applies pending Prisma migrations to production/staging database."
  echo ""
  echo "Usage:"
  echo "  ./scripts/db-prod.sh --yes"
  echo ""
  echo "Before running, make sure DATABASE_URL points to the correct production/staging database."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"

cd "$BACKEND_DIR"

if [ -f ".env.production" ]; then
  echo "Loading backend/.env.production"
  set -a
  source ".env.production"
  set +a
elif [ -f ".env" ]; then
  echo "Warning: backend/.env.production not found, using backend/.env"
  set -a
  source ".env"
  set +a
else
  echo "Error: no env file found"
  echo "Create backend/.env.production or set DATABASE_URL manually"
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "Error: DATABASE_URL is not set"
  exit 1
fi

echo "Running Prisma validate..."
npx prisma validate

echo "Checking migration status before deploy..."
npx prisma migrate status

echo "Applying pending production migrations..."
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Checking migration status after deploy..."
npx prisma migrate status

echo "Done."