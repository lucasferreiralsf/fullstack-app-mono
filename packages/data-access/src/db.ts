import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// for query purposes
function getDbClient(dbUrl: string) {
	const queryClient = postgres(dbUrl);
	return drizzle(queryClient, { schema });
}
export { getDbClient };
