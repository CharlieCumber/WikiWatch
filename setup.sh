#!/usr/bin/env bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

print_step()    { echo -e "\n${BLUE}▶ $1${NC}"; }
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error()   { echo -e "${RED}✗ $1${NC}" >&2; exit 1; }

echo -e "${BOLD}WikiWatch — First-time Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

print_step "Checking system requirements..."

if ! command -v docker &>/dev/null; then
    print_error "Docker is not installed.\n  Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
fi

if ! docker info &>/dev/null 2>&1; then
    print_error "Docker is not running.\n  Docker Desktop does not appear to be open.\n  Start it or install it here: https://www.docker.com/products/docker-desktop/"
fi

print_success "Docker is running"

if ! command -v poetry &>/dev/null; then
    print_error "Poetry is not installed.\n  Install it here: https://python-poetry.org/docs/"
fi

print_success "Poetry found"

if ! command -v npm &>/dev/null; then
    print_error "Node.js is not installed.\n  Install it here: https://nodejs.org/en"
fi

print_success "Node.js found"

if ! command -v mysql_config &>/dev/null; then
    if command -v brew &>/dev/null; then
        print_error "MySQL client library not found.\n  The Python database driver requires it. Install with:\n    brew install mysql-client\n  Then add it to your PATH:\n    echo 'export PATH=\"/opt/homebrew/opt/mysql-client/bin:\$PATH\"' >> ~/.zshrc\n  Then open a new terminal and re-run this script."
    else
        print_error "MySQL client library not found.\n  Install Homebrew (https://brew.sh) then run:\n    brew install mysql-client"
    fi
fi

print_success "MySQL client library found"

print_step "Setting up environment file..."

if [ ! -f .env ]; then
    cp .env.template .env
    print_success "Created .env from template"
else
    print_success ".env already exists — skipping"
fi

print_step "Installing Python dependencies..."

MYSQL_CLIENT_PREFIX="/opt/homebrew/opt/mysql-client"
if [ -d "$MYSQL_CLIENT_PREFIX" ]; then
    export MYSQLCLIENT_CFLAGS="-I${MYSQL_CLIENT_PREFIX}/include/mysql"
    export MYSQLCLIENT_LDFLAGS="-L${MYSQL_CLIENT_PREFIX}/lib -lmysqlclient"
fi

poetry install

if ! poetry run python -c "import MySQLdb" &>/dev/null 2>&1; then
    if [ ! -d "$MYSQL_CLIENT_PREFIX" ]; then
        print_error "MySQLdb failed to import and mysql-client was not found at ${MYSQL_CLIENT_PREFIX}.\n  Try: brew install mysql-client"
    fi
    echo -e "${BLUE}  Recompiling mysqlclient against installed MySQL client library...${NC}"
    poetry run pip install --force-reinstall --no-deps mysqlclient --quiet --disable-pip-version-check
fi
print_success "Python dependencies installed"

print_step "Installing frontend dependencies..."
(cd client && npm install --audit=false)
print_success "Frontend dependencies installed"

print_step "Starting database..."
docker compose up -d
print_success "Database container started"

print_step "Running database migrations..."
poetry run flask db upgrade
print_success "Migrations applied"

echo ""
echo -e "${GREEN}${BOLD}Setup complete!${NC}"
echo -e "Start the app with: ${BOLD}./run.sh${NC}"
