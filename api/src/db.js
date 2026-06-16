import 'dotenv/config';

import { PrismaClient } from './generated/prisma/client.ts';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debug: false,
  acquireTimeout: 30000,
  minimumIdle: 5,
  maximumPoolSize: 10,
});

export const prisma = new PrismaClient( { adapter });
export { Prisma } from './generated/prisma/client.ts';