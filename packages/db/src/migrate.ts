/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

dotenv.config();

const migrationClient = postgres(process.env.DB_URL!, { max: 1 });
const drizzleMigration = drizzle(migrationClient, { schema });

async function migrateSchemas() {
	try {
		await migrate(drizzleMigration, {
			migrationsFolder: `drizzle`,
		});

		console.log('🚀 ~ migrateSchemas ~ MIGRATIONS RAN!');
		await migrationClient.end();
	} catch (error) {
		console.log('🚀 ~ migrateSchemas ~ error:', error);
		throw error;
	}
}

// eslint-disable-next-line unicorn/prefer-top-level-await
migrateSchemas();
