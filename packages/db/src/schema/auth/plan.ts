import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';

export type PlanTable = typeof plan.$inferSelect;

export const plan = authSchema.table('plan', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	sku: text('sku').unique().notNull(),
	price: text('price'),
	name: text('name').notNull(),
	provider_product_id: text('provider_product_id').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
