import { relations } from 'drizzle-orm';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { subscriptions } from './subscriptions';

export type PaymentsTable = typeof payments.$inferSelect;

export const payments = authSchema.table('payments', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	subscriptionId: uuid('subscription_id').notNull(),
	amount: text('amount').notNull(),
	providerPaymentId: text('provider_payment_id'),
	date: timestamp('due_date').defaultNow(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
	subscription: one(subscriptions, {
		fields: [payments.subscriptionId],
		references: [subscriptions.id],
	}),
}));
