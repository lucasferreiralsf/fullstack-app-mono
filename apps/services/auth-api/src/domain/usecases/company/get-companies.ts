import { Usecase } from '@gymclub/utils';
import { CompanyService } from '../../../data/tenant/company-service';
import { CompanyModel } from '../../models/company';

export class GetCompanies implements Usecase<Params, CompanyModel[]> {
	constructor(private readonly companyService: CompanyService) {}

	async invoke({ search }: Params): Promise<CompanyModel[]> {
		const companies = await this.companyService.getCompanies({
			search,
		});

		return companies;
	}
}

interface Params {
	search?: string;
}
