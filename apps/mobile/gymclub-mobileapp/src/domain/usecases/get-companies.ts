import { CompanyModel } from '../models/company';

export interface GetCompanies {
	run: (searchTerm?: string) => Promise<CompanyModel[]>;
}
