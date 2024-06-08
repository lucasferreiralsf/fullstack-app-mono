import type { Config } from 'drizzle-kit';
import { env } from './src/env';

// eslint-disable-next-line import/no-default-export
export default {
	dbCredentials: {
		url: env.DB_URL,
	},
	dialect: 'postgresql',
	out: `./src/migrations`,
	schema: `./src/schema/index.ts`,
	strict: true,
	verbose: true,
} satisfies Config;
