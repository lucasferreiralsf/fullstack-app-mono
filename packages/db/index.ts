import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import * as schema from './src/schema';

export { schema };
export { makeDbClient } from './src/db';
export * from './src/schema';

export interface DbClientTransaction
	extends PgTransaction<
		PostgresJsQueryResultHKT,
		typeof schema,
		ExtractTablesWithRelations<typeof schema>
	> {}
