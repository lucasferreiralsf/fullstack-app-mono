import { relations } from 'drizzle-orm';
import { decimal, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { tenant } from './tenant';

export type GymProfileTable = typeof gymProfile.$inferSelect;

export const gymProfile = authSchema.table('gym_profile', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	tenantId: uuid('tenant_id')
		.notNull()
		.references(() => tenant.id),
	rating: decimal('rating', { precision: 2, scale: 1 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const gymProfileRelations = relations(gymProfile, ({ one }) => ({
	tenant: one(tenant, {
		fields: [gymProfile.tenantId],
		references: [tenant.id],
	}),
}));
