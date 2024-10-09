import { text, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';

export type RolesTable = typeof roles.$inferSelect;

export const roles = authSchema.table('roles', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description'),
});
