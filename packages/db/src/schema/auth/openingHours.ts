import { relations } from 'drizzle-orm';
import { integer, time, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { tenant } from './tenant';

export type OpeningHoursTable = typeof openingHours.$inferSelect;

export const openingHours = authSchema.table('opening_hours', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	gymId: uuid('gym_id')
		.notNull()
		.references(() => tenant.id),
	weekday: integer('weekday').notNull(),
	opensAt: time('opens_at'),
	closesAt: time('closes_at'),
});

export const openingHoursRelations = relations(openingHours, ({ one }) => ({
	gym: one(tenant, {
		fields: [openingHours.gymId],
		references: [tenant.id],
	}),
}));
