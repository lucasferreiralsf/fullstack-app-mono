import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { permissions } from './permissions';
import { roles } from './roles';

export type RolesPermissionsTable = typeof rolesPermissions.$inferSelect;

export const rolesPermissions = authSchema.table('roles_permissions', {
	roleId: uuid('role_id')
		.notNull()
		.references(() => roles.id),
	permissionId: uuid('permission_id')
		.notNull()
		.references(() => permissions.id),
});

export const rolesPermissionsRelations = relations(
	rolesPermissions,
	({ one }) => ({
		role: one(roles, {
			fields: [rolesPermissions.roleId],
			references: [roles.id],
		}),
		permission: one(permissions, {
			fields: [rolesPermissions.permissionId],
			references: [permissions.id],
		}),
	}),
);
