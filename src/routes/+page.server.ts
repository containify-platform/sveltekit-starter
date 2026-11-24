import { count } from 'drizzle-orm';
import { db } from '#lib/server/db/index.js';
import { visits } from '#lib/server/db/schema.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		await db.insert(visits).values({});
		const [row] = await db.select({ count: count() }).from(visits);
		return { visits: row.count, error: false };
	} catch (err) {
		console.error(err);
		return { visits: 0, error: true };
	}
};
