# WikiWatch

A real-time dashboard that visualises live edits made to Wikipedia. It connects to Wikipedia's edit stream, stores events in a database, and broadcasts analytics to a live web interface.

## Features

- **Live edit feed** — streams Wikipedia edits as they happen via WebSocket
- **Edit statistics** — total edit count, unique user count, and session time range
- **User breakdowns** — pie charts showing anonymous vs authenticated, bots vs humans, minor vs reviewed edits, and new vs existing pages
- **Patrol status** — proportion of edits on patrolled vs unpatrolled pages
- **Character change timeline** — rolling line chart of characters added or removed per minute
- **Geographic breakdown** — bar charts of top countries and cities (based on anonymous edits)

## Tech stack

| Layer       | Technologies                                                     |
|-------------|------------------------------------------------------------------|
| Frontend    | React, TypeScript, Recharts, styled-components, Socket.IO client |
| Backend     | Python, Flask, Flask-SocketIO, SQLAlchemy, Pandas                |
| Database    | MySQL (Docker)                                                   |
| Build tools | Poetry (python), Vite, npm                                       |

## Architecture

```
Wikipedia WebSocket stream
         │
         ▼
   WikiListener (thread)
         │  parses edit events
         ▼
      MySQL DB
         │  aggregates via Pandas
         ▼
   Flask-SocketIO
         │  broadcasts `stats` events
         ▼
   React dashboard
```

The `WikiListener` runs in a background thread, consuming events from Wikipedia's public stream. After each event is persisted, updated analytics are broadcast to all connected clients over Socket.IO.

## Prerequisites

Install the following before running setup:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — runs the MySQL database
- [Python 3.10+](https://www.python.org/)
- [Poetry](https://python-poetry.org/docs/) — manages Python dependencies
- [Node.js](https://nodejs.org/en) — runs the frontend
- [mysql-client](https://formulae.brew.sh/formula/mysql-client) — required by the Python database driver

  ```bash
  brew install mysql-client
  ```

## Getting started

### First-time setup

Run the setup script once after cloning the repository:

```bash
./setup.sh
```

This validates all prerequisites, copies `.env.template` to `.env`, installs Python and Node dependencies, starts the database container, and runs database migrations.

### Running locally

```bash
./run.sh
```

This starts the database, backend, and frontend together. Open [http://localhost:3000](http://localhost:3000) to view the app. Press `Ctrl+C` to stop everything.

## Development

### Running services individually

**Backend** (from the project root):

```bash
poetry run flask run
```

**Frontend** (from the `client/` directory):

```bash
npm start
```

**Database** (from the project root):

```bash
docker compose up -d
```

### Running tests

**Frontend** (from the `client/` directory):

```bash
npm test
```

Run in watch mode during development:

```bash
npm run test:watch
```

**Backend** (from the project root):

```bash
poetry run pytest
```

### Database migrations

Apply pending migrations:

```bash
poetry run flask db upgrade
```

Generate a new migration after model changes:

```bash
poetry run flask db migrate -m "description"
```

## Configuration

Copy `.env.template` to `.env` and adjust values as needed:

```bash
cp .env.template .env
```

| Variable                  | Description                       | Default            |
|---------------------------|-----------------------------------|--------------------|
| `FLASK_APP`               | Flask application entry point     | `app`              |
| `FLASK_DEBUG`             | Enable debug mode and auto-reload | `1`                |
| `SECRET_KEY`              | Flask secret key                  | `secret-key`       |
| `SQLALCHEMY_DATABASE_URI` | Database connection string        | MySQL on port 3310 |

## Project structure

```
WikiWatch/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # UI components (charts, cards, layout)
│       └── helpers/         # Utility functions and custom hooks
├── config/                  # Flask configuration
├── models/                  # SQLAlchemy models
├── services/                # WikiListener and analytics engine
├── sockets/                 # Socket.IO event handlers
├── helpers/                 # Shared Python utilities
├── tests/                   # Python test suite
├── migrations/              # Alembic database migrations
├── docker-compose.yaml      # MySQL container
├── setup.sh                 # First-time setup script
└── run.sh                   # Start all services
```
