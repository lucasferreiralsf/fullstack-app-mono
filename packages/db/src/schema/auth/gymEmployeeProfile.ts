import { relations } from 'drizzle-orm';
import { timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { user } from './user';

export type GymEmployeeProfileTable = typeof gymEmployeeProfile.$inferSelect;

export const gymEmployeeProfile = authSchema.table('gym_employee_profile', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const gymEmployeeProfileRelations = relations(
	gymEmployeeProfile,
	({ one }) => ({
		user: one(user, {
			fields: [gymEmployeeProfile.userId],
			references: [user.id],
		}),
	}),
);
