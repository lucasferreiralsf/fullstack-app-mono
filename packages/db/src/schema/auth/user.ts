import { relations } from 'drizzle-orm';
import { boolean, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { emailVerificationCode } from './emailVerificationCode';
import { passwordResetToken } from './passwordReset';
import { session } from './session';
import { tenant } from './tenant';

export type UserTable = typeof user.$inferSelect;

export const user = authSchema.table('user', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	tenantId: uuid('tenant_id')
		.notNull()
		.references(() => tenant.id),
	email: text('email').notNull().unique(),
	username: text('username').unique(),
	password: text('password'),
	firstName: text('first_name'),
	lastName: text('last_name'),
	emailVerified: boolean('email_verified'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const userRelations = relations(user, ({ one, many }) => ({
	sessions: many(session),
	tenant: one(tenant, {
		fields: [user.tenantId],
		references: [tenant.id],
	}),
	emailVerificationCodes: many(emailVerificationCode),
	passwordResetCode: one(passwordResetToken),
}));
