import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { tenant } from './tenant';
import { user } from './user';

export type TenantUserTable = typeof tenantUser.$inferSelect;

export const tenantUser = authSchema.table('tenant_user', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	tenantId: uuid('tenant_id')
		.notNull()
		.references(() => tenant.id),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
});

export const tenantUserRelations = relations(tenantUser, ({ one }) => ({
	user: one(user, {
		fields: [tenantUser.userId],
		references: [user.id],
	}),
	tenant: one(tenant, {
		fields: [tenantUser.tenantId],
		references: [tenant.id],
	}),
}));
