#!/usr/bin/env bash

set -euo pipefail

MIGRATION_NAME="${1:-}"

if [ -z "$MIGRATION_NAME" ]; then
  echo "Usage: bash scripts/db-dev.sh <migration_name>"
  echo ""
  echo "Example:"
  echo "  bash scripts/db-dev.sh init"
  echo "  bash scripts/db-dev.sh add_users"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$BACKEND_DIR"

if [ ! -f ".env" ]; then
  echo "Error: backend/.env not found"
  echo "Create backend/.env with DATABASE_URL"
  exit 1
fi

echo "Backend dir: $BACKEND_DIR"

echo "Running Prisma validate..."
npx prisma validate

echo "Creating and applying dev migration: $MIGRATION_NAME"
npx prisma migrate dev --name "$MIGRATION_NAME"

echo "Generating Prisma Client..."
npx prisma generate

echo "Checking migration status..."
npx prisma migrate status

echo "Done."