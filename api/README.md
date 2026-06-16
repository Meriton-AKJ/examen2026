# Tasks API

## Pre-requisites

- docker
- docker-compose 

## Quick start

Install dependencies.

```bash
npm i
```

Setup env variables.

```bash
cp ./.env.example .env
nano .env
```

Run containers.

```bash
docker compose up -d
```

Run the migration if needed.

```bash
npx prisma migrate dev --name init
```

To apply existing migrations without creating new ones.

```bash
npx prisma migrate deploy
```

Generate the client

```bash
npx prisma generate
```