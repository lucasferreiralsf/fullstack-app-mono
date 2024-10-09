import { text, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { user } from './user';

export type ProfileTable = typeof profile.$inferSelect;

export const profile = authSchema.table('profile', {
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	profileImage: text('profile_image'),
});
