import { CompanyEmployeeTable } from '@gymclub/db';

export interface CompanyEmployeeRepository {
	findByDocumentAndTenant: (
		docNumber: string,
		tenantId: string,
	) => Promise<CompanyEmployeeTable | null>;
}
