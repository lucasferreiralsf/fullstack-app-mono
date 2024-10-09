import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { ResetPassword } from '../../../src/domain/usecases/reset-password';
import { MockEncrypter } from '../../infra/cryptography/mock-encrypter';
import { MockUserRepository } from '../../infra/user/mock-user-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const encrypter = new MockEncrypter();

	const sut = new ResetPassword(userRepository, encrypter);

	return {
		sut,
		userRepository,
		encrypter,
	};
};

describe('ResetPassword', () => {
	test('should call userRepository.findByEmail with correct email', async () => {
		const { sut, userRepository } = makeSut();
		const findSpy = spyOn(userRepository, 'findByEmail');

		await sut.invoke({
			email: 'any_email@gmail.com',
			password: 'new_password',
		});

		expect(findSpy).toHaveBeenCalledWith('any_email@gmail.com');
	});

	test('should return INVALID_EMAIL if user is not found', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);

		const result = await sut.invoke({
			email: 'non_existent_email@gmail.com',
			password: 'new_password',
		});

		expect(result).toBe('INVALID_EMAIL');
	});

	test('should call encrypter.encrypt with new password', async () => {
		const { sut, encrypter } = makeSut();
		const encryptSpy = spyOn(encrypter, 'encrypt');

		await sut.invoke({
			email: 'any_email@gmail.com',
			password: 'new_password',
		});

		expect(encryptSpy).toHaveBeenCalledWith('new_password');
	});

	test('should call userRepository.updatePassword with correct values', async () => {
		const { sut, userRepository, encrypter } = makeSut();
		const updateSpy = spyOn(userRepository, 'updatePassword');
		spyOn(encrypter, 'encrypt').mockResolvedValueOnce('hashed_new_password');

		await sut.invoke({
			email: 'any_email@gmail.com',
			password: 'new_password',
		});

		expect(updateSpy).toHaveBeenCalledWith('any_id', 'hashed_new_password');
	});

	test('should return SUCCESS on successful password reset', async () => {
		const { sut } = makeSut();

		const result = await sut.invoke({
			email: 'any_email@gmail.com',
			password: 'new_password',
		});

		expect(result).toBe('SUCCESS');
	});
});
