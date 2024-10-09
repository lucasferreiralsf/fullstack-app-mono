import { relations } from 'drizzle-orm';
import { text, uuid } from 'drizzle-orm/pg-core';
import { authSchema } from './authSchema';
import { companyProfile } from './companyProfile';

export type CompanyEmployeeTable = typeof companyEmployee.$inferSelect;

export const companyEmployee = authSchema.table('company_employee', {
	id: uuid('id').notNull().defaultRandom().primaryKey(),
	companyId: uuid('company_id')
		.notNull()
		.references(() => companyProfile.id),
	docNumber: text('doc_number').notNull(),
});

export const companyEmployeeRelations = relations(
	companyEmployee,
	({ one }) => ({
		company: one(companyProfile, {
			fields: [companyEmployee.companyId],
			references: [companyProfile.id],
		}),
	}),
);
