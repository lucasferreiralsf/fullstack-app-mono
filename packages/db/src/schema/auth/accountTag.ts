import { relations } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';
import { accountTagUser } from './accountTagUser';
import { authSchema } from './authSchema';

export type accountTagTable = typeof accountTag.$inferSelect;

export const accountTag = authSchema.table('account_tag', {
	name: text('name').unique().notNull().primaryKey(),
});

export const accountTagRelations = relations(accountTag, ({ many }) => ({
	accountTagUsers: many(accountTagUser),
}));
