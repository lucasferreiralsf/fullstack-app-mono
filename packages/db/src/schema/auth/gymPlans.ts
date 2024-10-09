import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { plan } from './plan';
import { tenant } from './tenant';

export type GymPlansTable = typeof gymPlans.$inferSelect;

export const gymPlans = authSchema.table('gym_plans', {
	gymId: uuid('gym_id')
		.notNull()
		.references(() => tenant.id),
	planId: uuid('plan_id')
		.notNull()
		.references(() => plan.id),
});

export const gymPlansRelations = relations(gymPlans, ({ one }) => ({
	gym: one(tenant, {
		fields: [gymPlans.gymId],
		references: [tenant.id],
	}),
	plan: one(plan, {
		fields: [gymPlans.planId],
		references: [plan.id],
	}),
}));
