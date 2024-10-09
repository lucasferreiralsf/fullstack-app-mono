import { describe, expect, spyOn, test } from 'bun:test';
import { TenantRepository } from '../../../src/data/tenant/tenant-repository';
import { TenantType } from '../../../src/domain/models/tenant';
import { DefaultCompanyService } from '../../../src/infra/tenant/default-company-service';

const makeSut = () => {
	const tenantRepository = {
		getTenantsWithAddress: async () => [],
	} as TenantRepository;

	const sut = new DefaultCompanyService(tenantRepository);

	return {
		sut,
		tenantRepository,
	};
};

describe('DefaultCompanyService', () => {
	test('should call tenantRepository with correct values', async () => {
		const { sut, tenantRepository } = makeSut();
		const search = 'company_name';
		const repoSpy = spyOn(tenantRepository, 'getTenantsWithAddress');

		await sut.getCompanies({ search });

		expect(repoSpy).toHaveBeenCalledWith({
			search,
			type: TenantType.COMPANY,
		});
	});

	test('should return an empty array if no companies are found', async () => {
		const { sut, tenantRepository } = makeSut();
		spyOn(tenantRepository, 'getTenantsWithAddress').mockResolvedValueOnce([]);

		const result = await sut.getCompanies({ search: 'non_existent_company' });

		expect(result).toEqual([]);
	});

	test('should map tenant repository response to CompanyModel[]', async () => {
		const { sut, tenantRepository } = makeSut();
		const mockTenants = [
			{
				id: '1',
				name: 'Company One',
				address: { municipality: 'USA' },
			},
			{
				id: '2',
				name: 'Company Two',
				address: { municipality: 'Canada' },
			},
		];
		spyOn(tenantRepository, 'getTenantsWithAddress').mockReturnValueOnce(
			mockTenants as unknown as ReturnType<
				typeof tenantRepository.getTenantsWithAddress
			>,
		);

		const result = await sut.getCompanies({ search: 'company' });

		expect(result).toEqual([
			{ tenantId: '1', name: 'Company One', city: 'USA' },
			{ tenantId: '2', name: 'Company Two', city: 'Canada' },
		]);
	});
});
