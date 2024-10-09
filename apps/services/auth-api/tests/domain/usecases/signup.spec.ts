import { ResourceAlreadyExistsError } from '@gymclub/auth-api/utils/custom-errors';
import { describe, expect, spyOn, test } from 'bun:test';
import { SessionHandler } from '../../../src/data/authentication/session-handler';
import { Encrypter } from '../../../src/data/cryptography/encrypter';
import { OnboardingService } from '../../../src/data/onboarding/onboarding-service';
import { PaymentService } from '../../../src/data/payment/payment-service';
import { UserRepository } from '../../../src/data/user/user-repository';
import { RequestVerificationCodeUsecase } from '../../../src/domain/usecases/request-verification-code';
import { SignUp } from '../../../src/domain/usecases/signup';
import { MockSessionHandler } from '../../infra/authentication/mock-session-handler';
import { MockEncrypter } from '../../infra/cryptography/mock-encrypter';
import { MockOnboardingService } from '../../infra/onboarding/mock-onboarding-service';
import { MockPaymentService } from '../../infra/payment/mock-payment-service';
import { MockUserRepository } from '../../infra/user/mock-user-repository';
import { MockRequestVerificationCode } from './mock-request-verification-code';

const makeSut = () => {
	const sessionHandler = new MockSessionHandler() as SessionHandler;
	const userRepository = new MockUserRepository() as UserRepository;
	const encrypter = new MockEncrypter() as Encrypter;
	const requestVerificationCode =
		new MockRequestVerificationCode() as RequestVerificationCodeUsecase;
	const paymentService = new MockPaymentService() as PaymentService;
	const onboardingService = new MockOnboardingService() as OnboardingService;

	const sut = new SignUp(
		encrypter,
		sessionHandler,
		requestVerificationCode,
		userRepository,
		onboardingService,
		paymentService,
	);

	return {
		sut,
		sessionHandler,
		userRepository,
		encrypter,
		requestVerificationCode,
		onboardingService,
		paymentService,
	};
};

describe('SignUp', () => {
	test('Should validate the user document', async () => {
		const { sut, onboardingService } = makeSut();
		const validateUserDocumentSpy = spyOn(
			onboardingService,
			'validateUserDocument',
		);

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(validateUserDocumentSpy).toHaveBeenCalledWith(
			'any_doc_number',
			'any_tenant_id',
		);
	});

	test('Should call encrypter with correct password', async () => {
		const { sut, encrypter } = makeSut();
		const encryptSpy = spyOn(encrypter, 'encrypt');

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(encryptSpy).toHaveBeenCalledWith('any_password');
	});

	test('Should create the user', async () => {
		const { sut, userRepository } = makeSut();
		const createSpy = spyOn(userRepository, 'createAthlete');

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(createSpy).toHaveBeenCalledWith({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'encrypted_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});
	});

	test('Should throw error in case user creation fails', async () => {
		const { sut, sessionHandler, userRepository, requestVerificationCode } =
			makeSut();

		spyOn(userRepository, 'createAthlete').mockImplementationOnce(() => {
			throw new Error('any_error');
		});

		const invokeSpy = spyOn(requestVerificationCode, 'invoke');
		const createSessionSpy = spyOn(sessionHandler, 'createSession');

		const promise = sut.invoke({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			docNumber: '',
			tenantId: '',
		});

		expect(promise).rejects.toThrow(new ResourceAlreadyExistsError());
		expect(invokeSpy).not.toHaveBeenCalled();
		expect(createSessionSpy).not.toHaveBeenCalled();
	});

	test('Should call sessionHandler with correct userId', async () => {
		const { sut, sessionHandler } = makeSut();
		const createSessionSpy = spyOn(sessionHandler, 'createSession');

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(createSessionSpy).toHaveBeenCalledWith('any_id');
	});

	test('Should create subscription', async () => {
		const { sut, paymentService } = makeSut();
		const createSpy = spyOn(paymentService, 'createCustomer');

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(createSpy).toHaveBeenCalledWith({
			id: 'any_id',
			email: 'any_email@mail.com',
			username: 'any_username',
			firstName: 'any_firstname',
			lastName: 'any_lastname',
			emailVerified: false,
			profile: {
				id: 'any_profile_id',
				providerCustomerId: 'any_provider_id',
				docNumber: 'any_doc_number',
				docType: 'any_doc_type',
			},
		});
	});

	test('Should call requestVerificationCode with correct values', async () => {
		const { sut, requestVerificationCode } = makeSut();
		const invokeSpy = spyOn(requestVerificationCode, 'invoke');

		await sut.invoke({
			firstName: 'any_first_name',
			lastName: 'any_last_name',
			email: 'any_email@mail.com',
			password: 'any_password',
			docNumber: 'any_doc_number',
			tenantId: 'any_tenant_id',
		});

		expect(invokeSpy).toHaveBeenCalledWith({
			email: 'any_email@mail.com',
		});
	});
});
