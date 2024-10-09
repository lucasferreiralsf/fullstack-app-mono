import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { VerifyPasswordToken } from '../../../src/domain/usecases/verify-password-token';
import { MockPasswordComparator } from '../../infra/cryptography/mock-password-comparator';
import { MockUserRepository } from '../../infra/user/mock-user-repository';
import { MockPasswordTokenRepository } from './mock-password-token-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const passwordResetTokenRepository = new MockPasswordTokenRepository();
	const hashComparator = new MockPasswordComparator();

	const sut = new VerifyPasswordToken(
		userRepository,
		passwordResetTokenRepository,
		hashComparator,
	);

	return {
		sut,
		userRepository,
		passwordResetTokenRepository,
		hashComparator,
	};
};

describe('VerifyPasswordToken', () => {
	test('should call userRepository.findByEmail with correct email', async () => {
		const { sut, userRepository } = makeSut();
		const findSpy = spyOn(userRepository, 'findByEmail');

		await sut.invoke({ email: 'any_email@gmail.com', token: 'any_token' });

		expect(findSpy).toHaveBeenCalledWith('any_email@gmail.com');
	});

	test('should return INVALID_EMAIL if user is not found', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);

		const result = await sut.invoke({
			email: 'non_existent_email@gmail.com',
			token: 'any_token',
		});

		expect(result).toBe('INVALID_EMAIL');
	});

	test('should call passwordResetTokenRepository.findByUserId with correct userId', async () => {
		const { sut, passwordResetTokenRepository } = makeSut();
		const findByUserIdSpy = spyOn(passwordResetTokenRepository, 'findByUserId');

		await sut.invoke({ email: 'any_email@gmail.com', token: 'any_token' });

		expect(findByUserIdSpy).toHaveBeenCalledWith('any_id');
	});

	test('should return INVALID_CODE if token does not match', async () => {
		const { sut, hashComparator, passwordResetTokenRepository } = makeSut();

		spyOn(passwordResetTokenRepository, 'findByUserId').mockResolvedValueOnce({
			tokenHash: 'hashed_token',
			expiresAt: new Date(),
			userId: 'any_id',
		});
		spyOn(hashComparator, 'compare').mockResolvedValueOnce(false);

		const result = await sut.invoke({
			email: 'any_email@gmail.com',
			token: 'wrong_token',
		});

		expect(result).toBe('INVALID_CODE');
	});

	test('should return EXPIRED_CODE if token is expired', async () => {
		const { sut, hashComparator } = makeSut();
		spyOn(hashComparator, 'compare').mockResolvedValueOnce(true);

		const result = await sut.invoke({
			email: 'any_email@gmail.com',
			token: 'any_token',
		});

		expect(result).toBe('EXPIRED_CODE');
	});

	test('should return SUCCESS if token is valid and not expired', async () => {
		const { sut, passwordResetTokenRepository, hashComparator } = makeSut();
		spyOn(passwordResetTokenRepository, 'findByUserId').mockResolvedValueOnce({
			tokenHash: 'hashed_token',
			expiresAt: new Date(Date.now() + 1000),
			userId: 'any_id',
		});
		spyOn(hashComparator, 'compare').mockResolvedValueOnce(true);

		const result = await sut.invoke({
			email: 'any_email@gmail.com',
			token: 'any_token',
		});

		expect(result).toBe('SUCCESS');
	});
});
