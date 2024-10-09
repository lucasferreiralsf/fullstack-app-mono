import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { VerificationCodeRepository } from '../../../src/data/verification-code/verification-code-repository';
import { VerifyEmail } from '../../../src/domain/usecases/verify-email';
import { MockUserRepository } from '../../infra/user/mock-user-repository';
import { MockVerificationCodeRepository } from '../../infra/verification-code/mock-verification-code-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const verificationCodeRepository =
		new MockVerificationCodeRepository() as VerificationCodeRepository;

	const sut = new VerifyEmail(userRepository, verificationCodeRepository);
	return {
		sut,
		userRepository,
		verificationCodeRepository,
	};
};

describe('VerifyEmail', () => {
	test('Should call user repository with correct values', async () => {
		const { sut, userRepository } = makeSut();
		const findByEmailSpy = spyOn(userRepository, 'findByEmail');

		await sut
			.invoke({
				code: 'any_code',
				email: 'any_email@mail.com',
			})
			.catch(() => {});

		expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
	});

	test('Should throw error if email is already verified', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findByEmail').mockResolvedValueOnce({
			id: 'any_id',
			email: '',
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			emailVerified: true,
		});

		const result = await sut.invoke({ code: '', email: '' });
		expect(result).toBe('ALREADY_VERIFIED');
	});

	test('Should call verificationCodeRepository with correct values', async () => {
		const { sut, verificationCodeRepository } = makeSut();
		const findByCodeAndUserIdSpy = spyOn(
			verificationCodeRepository,
			'findByCodeAndUserId',
		);

		await sut
			.invoke({
				code: 'any_code',
				email: 'any_email@mail.com',
			})
			.catch(() => {});

		expect(findByCodeAndUserIdSpy).toHaveBeenCalledWith('any_code', 'any_id');
	});

	test('Should throw error if code is invalid', async () => {
		const { sut, verificationCodeRepository } = makeSut();
		spyOn(
			verificationCodeRepository,
			'findByCodeAndUserId',
		).mockResolvedValueOnce(null);

		const result = await sut.invoke({ code: '', email: '' });
		expect(result).toBe('INVALID_CODE');
	});

	test('Should throw error if code is expired', async () => {
		const { sut, verificationCodeRepository } = makeSut();
		spyOn(
			verificationCodeRepository,
			'findByCodeAndUserId',
		).mockResolvedValueOnce({
			id: '',
			email: '',
			code: '',
			userId: '',
			expiresAt: new Date(0),
		});

		const result = await sut.invoke({ code: '', email: '' });
		expect(result).toBe('EXPIRED_CODE');
	});

	test('Should call userRepository with correct values', async () => {
		const oneMinute = 60_000;
		const dateAhead = new Date(Date.now() + oneMinute);
		const { sut, userRepository, verificationCodeRepository } = makeSut();

		spyOn(
			verificationCodeRepository,
			'findByCodeAndUserId',
		).mockResolvedValueOnce({
			id: '',
			email: '',
			code: '',
			userId: '',
			expiresAt: dateAhead,
		});
		const updateEmailVerifiedSpy = spyOn(userRepository, 'updateEmailVerified');

		await sut.invoke({
			code: 'any_code',
			email: 'any_email',
		});

		expect(updateEmailVerifiedSpy).toHaveBeenCalledWith('any_email');
	});
});
