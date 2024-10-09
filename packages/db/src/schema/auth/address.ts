import { decimal, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';

export type AddressTable = typeof address.$inferSelect;

export const address = authSchema.table('address', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	street: text('street').notNull(),
	number: text('number').notNull(),
	complement: text('complement'),
	locality: text('locality').notNull(),
	municipality: text('municipality').notNull(),
	region: text('region').notNull(),
	country: text('country').notNull(),
	postalCode: text('postal_code').notNull(),
	latitude: decimal('latitude', { precision: 9, scale: 6 }).notNull(),
	longitude: decimal('longitude', { precision: 9, scale: 6 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});
