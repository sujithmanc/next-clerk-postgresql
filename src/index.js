import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'; // ← missing this
import * as schema from './db/schema.js';

const client = postgres(process.env.DATABASE_URL, {
    ssl: 'require',
    prepare: false,
});

export const db = drizzle(client, {
    schema,
    logger: true,
});

export default db;