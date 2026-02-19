# WikiWatch

An application to visualise recent edits made to Wikipedia pages.

## Getting started

### Prerequisites

Install the following before running the setup script:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — runs the local database
- [Python 3.10+](https://www.python.org/)
- [Poetry](https://python-poetry.org/docs/) — manages Python dependencies
- [Node.js](https://nodejs.org/en) — runs the frontend
- [mysql-client](https://formulae.brew.sh/formula/mysql-client) — required by the Python database driver

  ```bash
  brew install mysql-client
  ```

### First-time setup

Run the setup script once after cloning the repository:

```bash
./setup.sh
```

This will install all dependencies, create your `.env` file, start the database container, and run migrations.

### Running locally

```bash
./run.sh
```

This starts the database, backend, and frontend in one command. Open [http://localhost:3000](http://localhost:3000) to view the app. Press `Ctrl+C` to stop everything.
