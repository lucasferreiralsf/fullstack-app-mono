import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

function makeDbClient(dbUrl: string) {
	const connection = postgres(dbUrl);
	return drizzle(connection, { schema });
}

export type DrizzleDbClient = ReturnType<typeof makeDbClient>;

export { makeDbClient };
