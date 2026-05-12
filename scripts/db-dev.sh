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

# Для твоей IPv4-проблемы с npm/node
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--dns-result-order=ipv4first"

# Ищем корень репозитория
ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
PRISMA_SCHEMA="$BACKEND_DIR/prisma/schema.prisma"

cd "$ROOT_DIR"

if [ ! -d "$BACKEND_DIR" ]; then
  echo "Error: backend directory not found: $BACKEND_DIR"
  exit 1
fi

if [ ! -f "$BACKEND_DIR/.env" ]; then
  echo "Error: backend/.env not found"
  echo "Create backend/.env with DATABASE_URL"
  exit 1
fi

if [ ! -f "$PRISMA_SCHEMA" ]; then
  echo "Error: Prisma schema not found: $PRISMA_SCHEMA"
  exit 1
fi

echo "Root dir:    $ROOT_DIR"
echo "Backend dir: $BACKEND_DIR"
echo "Schema:      $PRISMA_SCHEMA"
echo ""

echo "Running Prisma validate..."
npm exec -w backend -- prisma validate --schema "$PRISMA_SCHEMA"

echo ""
echo "Creating and applying dev migration: $MIGRATION_NAME"
npm exec -w backend -- prisma migrate dev --name "$MIGRATION_NAME" --schema "$PRISMA_SCHEMA"

echo ""
echo "Generating Prisma Client..."
npm exec -w backend -- prisma generate --schema "$PRISMA_SCHEMA"

echo ""
echo "Checking migration status..."
npm exec -w backend -- prisma migrate status --schema "$PRISMA_SCHEMA"

echo ""
echo "Done."
