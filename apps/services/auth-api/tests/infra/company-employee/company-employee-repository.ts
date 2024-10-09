import { CompanyEmployeeTable } from '@gymclub/db';
import { CompanyEmployeeRepository } from '../../../src/data/company-employee/company-employee-repository';

export class MockCompanyEmployeeRepository
	implements CompanyEmployeeRepository
{
	async findByDocumentAndTenant(): Promise<CompanyEmployeeTable | null> {
		return {
			id: 'id',
			docNumber: 'doc_number',
			companyId: 'company_id',
		};
	}
}
