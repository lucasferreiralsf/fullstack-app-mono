/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from './env';
import * as schema from './schema';

// for migrations
const migrationClient = postgres(env.DB_URL, { max: 1 });
const drizzleMigration = drizzle(migrationClient, { schema });

async function migrateSchemas() {
	try {
		// This will run migrations on the database, skipping the ones already applied
		await migrate(drizzleMigration, {
			migrationsFolder: `src/migrations`,
		});

		// Don't forget to close the connection, otherwise the script will hang
		console.log('🚀 ~ migrateSchemas ~ MIGRATIONS RAN!');
		await migrationClient.end();
	} catch (error) {
		console.log('🚀 ~ migrateSchemas ~ error:', error);
		throw error;
	}
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void migrateSchemas();
