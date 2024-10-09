import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { RequestPasswordToken } from '../../../src/domain/usecases/request-password-token';
import { MockEncrypter } from '../../infra/cryptography/mock-encrypter';
import { MockUserRepository } from '../../infra/user/mock-user-repository';
import { MockVerificationCodeGenerator } from '../../infra/verification-code/mock-verification-code-generator';
import { MockVerificationCodeSender } from '../../infra/verification-code/mock-verification-code-sender';
import { MockPasswordTokenRepository } from './mock-password-token-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const passwordTokenRepository = new MockPasswordTokenRepository();
	const verificationCodeGenerator = new MockVerificationCodeGenerator();
	const verificationSender = new MockVerificationCodeSender();
	const encrypter = new MockEncrypter();

	const sut = new RequestPasswordToken(
		userRepository,
		passwordTokenRepository,
		verificationCodeGenerator,
		verificationSender,
		encrypter,
	);

	return {
		sut,
		userRepository,
		passwordTokenRepository,
		verificationCodeGenerator,
		verificationSender,
		encrypter,
	};
};

describe('RequestPasswordToken', () => {
	test('should call userRepository.findByEmail with correct email', async () => {
		const { sut, userRepository } = makeSut();
		const findSpy = spyOn(userRepository, 'findByEmail');

		await sut.invoke({ email: 'any_email@gmail.com' });

		expect(findSpy).toHaveBeenCalledWith('any_email@gmail.com');
	});

	test('should throw an error if user is not found', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);

		const promise = sut.invoke({ email: 'non_existent_email@gmail.com' });

		expect(promise).rejects.toThrow('User not found');
	});

	test('should call verificationCodeGenerator.generate', async () => {
		const { sut, verificationCodeGenerator } = makeSut();
		const generateSpy = spyOn(verificationCodeGenerator, 'generate');

		await sut.invoke({ email: 'any_email@gmail.com' });

		expect(generateSpy).toHaveBeenCalled();
	});

	test('should call encrypter.encrypt with correct code', async () => {
		const { sut, encrypter, verificationCodeGenerator } = makeSut();
		const encryptSpy = spyOn(encrypter, 'encrypt');
		spyOn(verificationCodeGenerator, 'generate').mockResolvedValueOnce(
			'any_code',
		);

		await sut.invoke({ email: 'any_email@gmail.com' });

		expect(encryptSpy).toHaveBeenCalledWith('any_code');
	});

	test('should call passwordTokenRepository.create with correct values', async () => {
		const { sut, passwordTokenRepository, encrypter } = makeSut();
		const createSpy = spyOn(passwordTokenRepository, 'create');
		spyOn(encrypter, 'encrypt').mockResolvedValueOnce('hashed_code');

		await sut.invoke({ email: 'any_email@gmail.com' });

		expect(createSpy).toHaveBeenCalledWith('any_id', 'hashed_code');
	});

	test('should call verificationSender.sendEmail with correct values', async () => {
		const { sut, verificationSender, verificationCodeGenerator } = makeSut();
		const sendEmailSpy = spyOn(verificationSender, 'sendEmail');
		spyOn(verificationCodeGenerator, 'generate').mockResolvedValueOnce(
			'any_code',
		);

		await sut.invoke({ email: 'any_email@gmail.com' });

		expect(sendEmailSpy).toHaveBeenCalledWith(
			'any_code',
			'any_email@gmail.com',
		);
	});

	test('should return masked email in result', async () => {
		const { sut } = makeSut();

		const result = await sut.invoke({ email: 'any_email@gmail.com' });

		expect(result).toEqual({ email: 'a*******l@gmail.com' });
	});
});
