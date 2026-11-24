import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	// Read when the server starts, not baked into the build. On Containify it's
	// {{ "Postgres".DATABASE_URL }}. Optional so `npm run build` works without it.
	DATABASE_URL: {
		description: 'The Postgres connection string.',
		schema: (value) => value ?? ''
	}
});
