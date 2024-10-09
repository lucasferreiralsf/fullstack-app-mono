import { relations } from 'drizzle-orm';
import { timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { tenant } from './tenant';

export type CompanyProfileTable = typeof companyProfile.$inferSelect;

export const companyProfile = authSchema.table('company_profile', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	tenantId: uuid('tenant_id')
		.notNull()
		.references(() => tenant.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const companyProfileRelations = relations(companyProfile, ({ one }) => ({
	tenant: one(tenant, {
		fields: [companyProfile.tenantId],
		references: [tenant.id],
	}),
}));
