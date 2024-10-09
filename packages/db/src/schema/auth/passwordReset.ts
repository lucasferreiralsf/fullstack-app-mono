import { relations } from 'drizzle-orm';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { user } from './user';

export type PasswordResetTokenTable = typeof passwordResetToken.$inferSelect;

export const passwordResetToken = authSchema.table('password_reset_tokens', {
	userId: uuid('user_id').primaryKey().notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
	tokenHash: text('token_hash'),
});

export const passwordResetTokenRelations = relations(
	passwordResetToken,
	({ one }) => ({
		user: one(user, {
			fields: [passwordResetToken.userId],
			references: [user.id],
		}),
	}),
);
