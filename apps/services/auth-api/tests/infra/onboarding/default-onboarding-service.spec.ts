import { DocumentNotFoundError } from '@gymclub/auth-api/utils/custom-errors';
import { describe, expect, spyOn, test } from 'bun:test';
import { CompanyEmployeeRepository } from '../../../src/data/company-employee/company-employee-repository';
import { DefaultOnboardingService } from '../../../src/infra/onboarding/default-onboarding-service';
import { MockCompanyEmployeeRepository } from '../company-employee/company-employee-repository';

const makeSut = () => {
	const companyEmployeeRepository =
		new MockCompanyEmployeeRepository() as CompanyEmployeeRepository;

	const sut = new DefaultOnboardingService(companyEmployeeRepository);
	return {
		sut,
		companyEmployeeRepository,
	};
};

describe('DefaultOnboardingService', () => {
	describe('validateUserDocument', () => {
		test('Should resolve if companyEmployeeRepository finds the document', async () => {
			const { sut } = makeSut();

			const promise = sut.validateUserDocument('doc_number', 'tenant_id');
			expect(promise).resolves.toBeUndefined();
		});

		test('Should throw error in case companyEmployeeRepository fails to find the document', async () => {
			const { sut, companyEmployeeRepository } = makeSut();
			spyOn(
				companyEmployeeRepository,
				'findByDocumentAndTenant',
			).mockResolvedValueOnce(null);

			const promise = sut.validateUserDocument('doc_number', 'tenant_id');

			expect(promise).rejects.toThrow(new DocumentNotFoundError());
		});
	});
});
