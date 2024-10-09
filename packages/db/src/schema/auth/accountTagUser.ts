import { relations } from 'drizzle-orm';
import { text, uuid } from 'drizzle-orm/pg-core';
import { accountTag } from './accountTag';
import { authSchema } from './authSchema';
import { user } from './user';

export type AccountTagUserTable = typeof accountTagUser.$inferSelect;

export const accountTagUser = authSchema.table('account_tag_user', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	accountTagName: text('account_tag_id')
		.notNull()
		.references(() => accountTag.name),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
});

export const accountTagUserRelations = relations(accountTagUser, ({ one }) => ({
	user: one(user, {
		fields: [accountTagUser.userId],
		references: [user.id],
	}),
	accountTag: one(accountTag, {
		fields: [accountTagUser.accountTagName],
		references: [accountTag.name],
	}),
}));
