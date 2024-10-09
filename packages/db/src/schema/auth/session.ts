import { relations } from 'drizzle-orm';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { user } from './user';

export type SessionTable = typeof session.$inferSelect;

export const session = authSchema.table('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id').notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
	ipAddress: text('ip_address'),
	platform: text('platform'),
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));
