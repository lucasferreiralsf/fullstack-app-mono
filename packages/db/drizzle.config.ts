import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
	schema: './src/schema/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DB_URL,
	},
} as Config;
