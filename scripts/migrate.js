// Applies the committed migrations in ./drizzle. Containify runs it as the
// pre-deploy command, before a new release takes traffic: `node scripts/migrate.js`.
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });
try {
	await migrate(drizzle(client), { migrationsFolder: './drizzle' });
	console.log('migrations up to date');
} finally {
	await client.end();
}
