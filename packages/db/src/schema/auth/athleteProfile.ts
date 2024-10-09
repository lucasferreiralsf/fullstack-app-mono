import { relations } from 'drizzle-orm';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { subscriptions } from './subscriptions';
import { user } from './user';

export type AthleteProfileTable = typeof athleteProfile.$inferSelect;

export const athleteProfile = authSchema.table('athlete_profile', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	providerCustomerId: text('provider_customer_id'),
	docNumber: text('doc_number'),
	docType: text('doc_type'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const athleteProfileRelations = relations(
	athleteProfile,
	({ one, many }) => ({
		user: one(user, {
			fields: [athleteProfile.userId],
			references: [user.id],
		}),
		subscriptions: many(subscriptions),
	}),
);
