# Express + Prisma 7 + MariaDB - Step by step

## 1. Install dependencies

```bash
npm install express @prisma/client @prisma/adapter-mariadb mariadb dotenv
npm install -D prisma nodemon
```

| Package | Role | When |
|---|---|---|
| `@prisma/client` | Generated query client | Runtime |
| `@prisma/adapter-mariadb` | MariaDB JS driver adapter | Runtime |
| `mariadb` | Peer dep of the adapter | Runtime |
| `dotenv` | Load `.env` into `process.env` | Runtime |
| `prisma` | CLI (migrate, generate, studio) | Dev only |

---

## 2. Environment variables - `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_ROOT_PASSWORD=rootpassword
DB_DATABASE=tasks_db
DB_URL=mysql://myuser:mypassword@localhost:3306/tasks_db
```

Add `.env` to `.gitignore`. `DB_URL` is used by the Prisma CLI. The individual vars are used by the app at runtime.

---

## 3. Docker Compose - `docker-compose.yaml`

```yaml
services:
  db:
    image: mariadb:11.4
    restart: unless-stopped
    env_file: .env
    ports:
      - "3306:3306"
    environment:
      MARIADB_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MARIADB_DATABASE: ${DB_DATABASE}
      MARIADB_USER: ${DB_USERNAME}
      MARIADB_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mariadb_data:/var/lib/mysql
    networks:
      - app-network

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:5.2
    ports:
      - "8080:80"
    environment:
      PMA_HOST: db
    depends_on:
      - db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mariadb_data: {}
```

All services must share the same network to resolve each other by service name (`db`). The Node.js app runs on the host and reaches MariaDB via `localhost:3306`.

```bash
docker compose up -d
```

---

## 4. Init Prisma

```bash
npx prisma init --datasource-provider mysql
```

Note: the provider is `mysql` even for MariaDB - Prisma has no separate MariaDB provider.

---

## 5. Schema - `prisma/schema.prisma`

In Prisma 7, the `datasource` block has no `url` - that moves to `prisma.config.ts`.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "mysql"
}

enum TaskStatus {
  pending
  done
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  tasks Task[]
}

model Task {
  id          Int        @id @default(autoincrement())
  title       String
  description String
  status      TaskStatus @default(pending)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  userId      Int
  user        User       @relation(fields: [userId], references: [id])
}
```

`userId` is the real foreign key column. `user` and `tasks` are relation fields - they only exist in Prisma, not in the database.

---

## 6. Prisma config — `prisma.config.ts`

Used by the CLI only (migrate, generate, studio). Not imported by the app.

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: env('DB_URL'),
  },
});
```

`env()` here comes from `prisma/config` - it's a Prisma typed helper, not a Node.js function.

---

## 7. Run the migration

```bash
npx prisma migrate dev --name init
```

This creates the migration SQL file in `prisma/migrations/` and applies it to the database. The migration user needs `CREATE DATABASE` privileges (use root locally) because Prisma creates a temporary shadow database to detect schema drift.

To apply existing migrations without creating new ones:

```bash
npx prisma migrate deploy
```

---

## 8. Generate the client

```bash
npx prisma generate
```

Reads `schema.prisma` and writes the typed client into `src/generated/prisma/`. Run once after init, and again after any schema change.

---

## 9. Prisma client singleton - `src/db.js`

```js
import 'dotenv/config';
import { PrismaClient } from './generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port:     process.env.DB_PORT,
});

export const prisma = new PrismaClient({ adapter });
```

One shared instance: the adapter manages the connection pool. The import path must point to `index.js` explicitly: ESM does not resolve directory imports automatically.

---

## 10. Use the ORM in controllers

All controller functions become `async`. Prisma queries return promises.

```js
import { prisma } from '../db.js';

// GET all
const tasks = await prisma.task.findMany({ include: { user: true } });

// GET one — returns null if not found (no exception)
const task = await prisma.task.findUnique({ where: { id }, include: { user: true } });
if (!task) return res.status(404).json({ message: 'Task not found' });

// POST
const created = await prisma.task.create({ data: { title, description, userId } });

// PATCH — throws P2025 if not found
const updated = await prisma.task.update({ where: { id }, data: { title, description, status } });

// DELETE — throws P2025 if not found
await prisma.task.delete({ where: { id } });
```

`findUnique` returns `null` when nothing is found — check manually. `update` and `delete` throw a `P2025` error instead — catch it and return 404.

---

## 11. Explore with Prisma Studio

```bash
npx prisma studio
```

A visual browser for your database — opens at `http://localhost:5555`.

## 12. To move further

- Global error handler in `server.js` using `next(_error)`
- Small input validation using Zod
- CORS management with `app.user(cors())` in `server.js`
- Add a `User model`
- Convert API in Typescript