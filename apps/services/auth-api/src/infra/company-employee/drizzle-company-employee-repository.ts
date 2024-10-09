import {
	companyEmployee,
	CompanyEmployeeTable,
	companyProfile,
	tenant,
} from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { and, eq } from 'drizzle-orm';
import { CompanyEmployeeRepository } from '../../data/company-employee/company-employee-repository';

export class DrizzleCompanyEmployeeRepository
	implements CompanyEmployeeRepository
{
	constructor(private readonly client: DrizzleDbClient) {}

	async findByDocumentAndTenant(
		docNumber: string,
		tenantId: string,
	): Promise<CompanyEmployeeTable | null> {
		const [record] = await this.client
			.select()
			.from(companyEmployee)
			.innerJoin(
				companyProfile,
				eq(companyEmployee.companyId, companyProfile.id),
			)
			.innerJoin(tenant, eq(companyProfile.tenantId, tenant.id))
			.where(
				and(eq(tenant.id, tenantId), eq(companyEmployee.docNumber, docNumber)),
			);

		return record?.company_employee
			? (record.company_employee as CompanyEmployeeTable)
			: null;
	}
}
