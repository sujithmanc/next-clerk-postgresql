import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema.js';

const globalForDb = global;

if (!globalForDb.client) {
  globalForDb.client = postgres(process.env.DATABASE_URL, {
    ssl: 'require',
    prepare: false,
    max: 1,
  });
}

export const db = drizzle(globalForDb.client, {
  schema,
  logger: true,
});

export default db;