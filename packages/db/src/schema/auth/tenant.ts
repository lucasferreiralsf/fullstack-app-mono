import { relations } from 'drizzle-orm';
import { pgEnum, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { address } from './address';
import { authSchema } from './authSchema';
import { user } from './user';

export type TenantTable = typeof tenant.$inferSelect;

export const TenantTypeEnum = pgEnum('tenant_type', ['GYM', 'COMPANY']);

export const tenant = authSchema.table('tenant', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	name: text('name').notNull(),
	docId: text('doc_id'),
	docType: text('doc_type'),
	addressId: uuid('address_id').references(() => address.id),
	type: TenantTypeEnum('type').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const tenantRelations = relations(tenant, ({ many, one }) => ({
	users: many(user),
	address: one(address, {
		fields: [tenant.addressId],
		references: [address.id],
	}),
}));
