import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { RequestVerificationCode } from '../../../src/domain/usecases/request-verification-code';
import { MockUserRepository } from '../../infra/user/mock-user-repository';
import { MockVerificationCodeGenerator } from '../../infra/verification-code/mock-verification-code-generator';
import { MockVerificationCodeRepository } from '../../infra/verification-code/mock-verification-code-repository';
import { MockVerificationCodeSender } from '../../infra/verification-code/mock-verification-code-sender';

const makeSut = () => {
	const verificationSender = new MockVerificationCodeSender();
	const verificationCodeGenerator = new MockVerificationCodeGenerator();
	const verificationCodeRepository = new MockVerificationCodeRepository();
	const userRepository = new MockUserRepository() as UserRepository;

	const sut = new RequestVerificationCode(
		verificationSender,
		verificationCodeGenerator,
		verificationCodeRepository,
		userRepository,
	);

	return {
		sut,
		verificationCodeGenerator,
		verificationCodeRepository,
		verificationSender,
	};
};

describe('RequestVerificationCode', () => {
	test('should call verificationCodeGenerator.generate', async () => {
		const { sut, verificationCodeGenerator } = makeSut();
		const generateSpy = spyOn(verificationCodeGenerator, 'generate');

		await sut.invoke({ email: 'any_email' });

		expect(generateSpy).toHaveBeenCalled();
	});

	test('should call Verification Code Repository with correct values', async () => {
		const { sut, verificationCodeRepository } = makeSut();
		const createSpy = spyOn(verificationCodeRepository, 'create');

		await sut.invoke({
			email: 'any_email',
		});

		expect(createSpy).toHaveBeenCalledWith({
			userId: 'any_id',
			email: 'any_email',
			code: 'any_code',
		});
	});

	test('should call Verification Code Sender with correct values', async () => {
		const { sut, verificationSender } = makeSut();
		const sendEmailSpy = spyOn(verificationSender, 'sendEmail');

		await sut.invoke({
			email: 'any_email',
		});

		expect(sendEmailSpy).toHaveBeenCalledWith('any_code', 'any_email');
	});

	test('should return the user and the email', async () => {
		const { sut } = makeSut();

		const result = await sut.invoke({
			email: 'any_email@gmail.com',
		});

		expect(result).toEqual({ email: 'a*******l@gmail.com' });
	});
});
