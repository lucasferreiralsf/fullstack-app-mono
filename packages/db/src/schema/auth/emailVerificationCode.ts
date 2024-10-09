import { relations } from 'drizzle-orm';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { user } from './user';

export type EmailVerificationCodeTable =
	typeof emailVerificationCode.$inferSelect;

export const emailVerificationCode = authSchema.table(
	'email_verification_code',
	{
		id: uuid('id').notNull().defaultRandom().primaryKey(),
		userId: uuid('user_id').notNull(),
		expiresAt: timestamp('expires_at', {
			withTimezone: true,
			mode: 'date',
		}).notNull(),
		code: text('code'),
		email: text('email'),
	},
);

export const emailVerificationCodeRelations = relations(
	emailVerificationCode,
	({ one }) => ({
		user: one(user, {
			fields: [emailVerificationCode.userId],
			references: [user.id],
		}),
	}),
);
