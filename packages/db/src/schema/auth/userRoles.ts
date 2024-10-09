import { relations } from 'drizzle-orm';
import { text, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { roles } from './roles';
import { user } from './user';

export type UserRolesTable = typeof userRoles.$inferSelect;

export const userRoles = authSchema.table('user_roles', {
	roleId: uuid('role_id')
		.notNull()
		.references(() => roles.id),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	name: text('name').notNull().unique(),
});

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	role: one(roles, {
		fields: [userRoles.roleId],
		references: [roles.id],
	}),
	user: one(user, {
		fields: [userRoles.userId],
		references: [user.id],
	}),
}));
