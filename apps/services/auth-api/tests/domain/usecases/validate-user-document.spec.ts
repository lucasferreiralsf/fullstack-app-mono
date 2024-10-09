import { describe, expect, spyOn, test } from 'bun:test';
import { ValidateUserDocument } from '../../../src/domain/usecases/validate-user-document';
import { MockOnboardingService } from '../../infra/onboarding/mock-onboarding-service';

const makeSut = () => {
	const onboardingService = new MockOnboardingService();
	const sut = new ValidateUserDocument(onboardingService);
	return {
		sut,
		onboardingService,
	};
};

describe('ValidateUserDocument', () => {
	test('Should call onboardingService with correct values', async () => {
		const { sut, onboardingService } = makeSut();
		const validateUserDocumentSpy = spyOn(
			onboardingService,
			'validateUserDocument',
		);

		await sut.invoke({
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(validateUserDocumentSpy).toHaveBeenCalledWith(
			'any_doc_number',
			'any_tenant_id',
		);
	});

	test('Should throw if onboardingService throws', async () => {
		const { sut, onboardingService } = makeSut();
		spyOn(onboardingService, 'validateUserDocument').mockRejectedValueOnce(
			new Error(),
		);

		const promise = sut.invoke({
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(promise).rejects.toThrow(new Error());
	});
});
