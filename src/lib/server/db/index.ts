import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';

if (!DATABASE_URL) console.warn('DATABASE_URL is not set: queries will fail');

// postgres() connects lazily, on the first query, so the build never touches the database.
export const db = drizzle(postgres(DATABASE_URL, { max: 5 }), { schema });
