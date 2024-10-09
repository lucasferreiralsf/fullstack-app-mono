import { relations } from 'drizzle-orm';
import { pgEnum, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { athleteProfile } from './athleteProfile';
import { authSchema } from './authSchema';
import { payments } from './payments';

export type SubscriptionsTable = typeof subscriptions.$inferSelect;

export const SubscriptionStatusEnum = pgEnum('subscription_status', [
	'ACTIVE',
	'INACTIVE',
	'PAYMENT_PENDING',
]);

export const subscriptions = authSchema.table('subscriptions', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	athleteProfileId: uuid('athlete_profile_id')
		.notNull()
		.references(() => athleteProfile.id),
	planId: uuid('plan_id').notNull(),
	providerSubscriptionId: text('provider_subscription_id'),
	startDate: timestamp('start_date').defaultNow(),
	endDate: timestamp('end_date'),
	status: SubscriptionStatusEnum('status').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const subscriptionRelations = relations(
	subscriptions,
	({ one, many }) => ({
		athleteProfile: one(athleteProfile, {
			fields: [subscriptions.athleteProfileId],
			references: [athleteProfile.id],
		}),
		payments: many(payments),
	}),
);
