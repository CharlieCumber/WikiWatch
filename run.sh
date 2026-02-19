#!/usr/bin/env bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

print_step()    { echo -e "${BLUE}▶ $1${NC}"; }
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error()   { echo -e "${RED}✗ $1${NC}" >&2; exit 1; }

if ! command -v docker &>/dev/null; then
    print_error "Docker is not installed.\n  Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
fi

if ! docker info &>/dev/null 2>&1; then
    print_error "Docker is not running.\n  Docker Desktop does not appear to be open.\n  Start it or install it here: https://www.docker.com/products/docker-desktop/"
fi

setup_required=false
[ ! -f .env ]                  && setup_required=true
[ ! -d .venv ]                 && setup_required=true
[ ! -d client/node_modules ]   && setup_required=true

if [ "$setup_required" = true ]; then
    echo -e "${RED}✗ Project is not set up yet.${NC}"
    echo ""
    printf "Run setup now? [y/N] "
    read -r answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        bash "$(dirname "$0")/setup.sh"
    else
        echo "Run ./setup.sh to get started."
        exit 1
    fi
fi

echo -e "${BOLD}WikiWatch${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

print_step "Starting database..."
docker compose up -d
print_success "Database running"

echo ""

print_step "Starting backend server..."
poetry run flask run &
FLASK_PID=$!
print_success "Backend running on http://localhost:5000"

echo ""

shutdown() {
    echo ""
    echo "Shutting down..."
    kill "$FLASK_PID" 2>/dev/null || true
}

trap shutdown EXIT INT TERM

print_step "Starting frontend..."
print_success "Frontend opening on http://localhost:3000"
echo ""
echo -e "Press ${BOLD}Ctrl+C${NC} to stop."
echo ""

cd client && npm start
