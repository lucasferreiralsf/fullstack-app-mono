import { HttpClient } from '@/data/interfaces/http/http-client';

import { CompanyModel } from '@/domain/models/company';
import { GetCompanies } from '@/domain/usecases/get-companies';

export class DefaultGetCompanies implements GetCompanies {
	constructor(private readonly client: HttpClient) {}

	async run(search?: string): Promise<CompanyModel[]> {
		const params: Record<string, string> = {};

		if (search) params.search = search;

		const response = await this.client.request<GetCompaniesDto[]>({
			method: 'get',
			url: '/companies',
			params,
		});

		return response.body;
	}
}

export interface GetCompaniesDto {
	tenantId: string;
	name: string;
	countryName: string;
}
