import { text, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';

export type PermissionsTable = typeof permissions.$inferSelect;

export const permissions = authSchema.table('permissions', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	name: text('name').notNull().unique(),
});
