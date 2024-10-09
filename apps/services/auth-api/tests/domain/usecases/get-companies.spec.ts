import { describe, expect, spyOn, test } from 'bun:test';
import { CompanyService } from '../../../src/data/tenant/company-service';
import { CompanyModel } from '../../../src/domain/models/company';
import { GetCompanies } from '../../../src/domain/usecases/company/get-companies';

const makeSut = () => {
	const companyService: CompanyService = {
		async getCompanies(params) {
			return [];
		},
	};
	const sut = new GetCompanies(companyService);

	return {
		sut,
		companyService,
	};
};

describe('GetCompanies', () => {
	test('should call companyService with correct values', async () => {
		const { sut, companyService } = makeSut();
		const search = 'test_company';
		const serviceSpy = spyOn(
			companyService,
			'getCompanies',
		).mockResolvedValueOnce([]);

		await sut.invoke({ search });

		expect(serviceSpy).toHaveBeenCalledWith({ search });
	});

	test('should return an empty array if no companies are found', async () => {
		const { sut, companyService } = makeSut();
		spyOn(companyService, 'getCompanies').mockResolvedValueOnce([]);

		const result = await sut.invoke({ search: 'non_existent_company' });

		expect(result).toEqual([]);
	});

	test('should map company service response to CompanyModel[]', async () => {
		const { sut, companyService } = makeSut();
		const mockCompanies = [
			{ name: 'any_company', city: 'any_country', tenantId: '1' },
			{ name: 'any_company_2', city: 'any_country_2', tenantId: '2' },
		];
		spyOn(companyService, 'getCompanies').mockResolvedValueOnce(
			mockCompanies as CompanyModel[],
		);

		const result = await sut.invoke({ search: 'company' });

		expect(result).toEqual([
			{ name: 'any_company', city: 'any_country', tenantId: '1' },
			{ name: 'any_company_2', city: 'any_country_2', tenantId: '2' },
		]);
	});
});
