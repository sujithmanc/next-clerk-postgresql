import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as scheme from './db/schema.js'

export const db = drizzle(
    {
        schema: scheme,
        mode: "default",
        connection: process.env.DATABASE_URL,
        logger: true
    }
)
export default db;