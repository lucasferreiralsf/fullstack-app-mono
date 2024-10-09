import {
	CompanyService,
	GetCompaniesParams,
} from '../../data/tenant/company-service';
import { TenantRepository } from '../../data/tenant/tenant-repository';
import { CompanyModel } from '../../domain/models/company';
import { TenantType } from '../../domain/models/tenant';

export class DefaultCompanyService implements CompanyService {
	constructor(private readonly tenantRepository: TenantRepository) {}

	async getCompanies(params: GetCompaniesParams): Promise<CompanyModel[]> {
		const companies = await this.tenantRepository.getTenantsWithAddress({
			search: params.search,
			type: TenantType.COMPANY,
		});

		return companies.map((company) => ({
			tenantId: company.id,
			name: company.name,
			city: company.address.municipality,
		}));
	}
}
