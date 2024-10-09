import { CompanyModel } from '../../domain/models/company';

export interface CompanyService {
	getCompanies: (params: GetCompaniesParams) => Promise<CompanyModel[]>;
}

export interface GetCompaniesParams {
	search?: string;
}
