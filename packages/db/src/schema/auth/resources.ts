import { pgEnum, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';

export const ResourceTypeEnum = pgEnum('resource_type', [
	'IMAGE',
	'VIDEO',
	'DOCUMENT',
]);

export type ResourceTable = typeof resource.$inferSelect;

export const resource = authSchema.table('resource', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	entityId: uuid('entity_id').notNull(),
	url: text('url').notNull(),
	type: ResourceTypeEnum('type').notNull(),
	description: text('description'),
	entityType: text('entity_type'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
