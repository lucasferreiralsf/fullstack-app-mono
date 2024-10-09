import { GetCompanies } from '../../domain/usecases/company/get-companies';
import { dbClient } from '../../infra/clients';
import { DefaultCompanyService } from '../../infra/tenant/default-company-service';
import { DrizzleTenantRepository } from '../../infra/tenant/drizzle-tenant-repository';

export const makeGetCompanies = () => {
	const tenantRepository = new DrizzleTenantRepository(dbClient);
	const companyService = new DefaultCompanyService(tenantRepository);

	return new GetCompanies(companyService);
};
