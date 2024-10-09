import { InvalidUsernameOrPasswordError } from '@gymclub/auth-api/utils/custom-errors';
import { describe, expect, spyOn, test } from 'bun:test';
import { SessionHandler } from '../../../src/data/authentication/session-handler';
import { PasswordComparator } from '../../../src/data/cryptography/password-comparator';
import { UserRepository } from '../../../src/data/user/user-repository';
import { SignIn } from '../../../src/domain/usecases/signin';
import { MockSessionHandler } from '../../infra/authentication/mock-session-handler';
import { MockPasswordComparator } from '../../infra/cryptography/mock-password-comparator';
import { MockUserRepository } from '../../infra/user/mock-user-repository';

const makeSut = () => {
	const sessionHandler = new MockSessionHandler() as SessionHandler;
	const userRepository = new MockUserRepository() as UserRepository;
	const passwordComparator = new MockPasswordComparator() as PasswordComparator;
	const sut = new SignIn(sessionHandler, userRepository, passwordComparator);
	return { sut, userRepository, sessionHandler, passwordComparator };
};

describe('Signin', () => {
	test('Should call user repository with correct email', async () => {
		const { sut, userRepository } = makeSut();
		const findByEmailSpy = spyOn(userRepository, 'findUserWithPasswordByEmail');

		await sut.invoke({
			email: 'any_email@mail.com',
			password: 'any_password',
		});

		expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
	});

	test('Should throw InvalidUsernameOrPasswordError if user is not found', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findUserWithPasswordByEmail').mockResolvedValueOnce(
			null,
		);

		const promise = sut.invoke({ email: '', password: '' });

		expect(promise).rejects.toThrow(new InvalidUsernameOrPasswordError());
	});

	test('Should call password comparator with correct values', async () => {
		const { sut, passwordComparator } = makeSut();
		const compareSpy = spyOn(passwordComparator, 'compare');

		await sut.invoke({ email: '', password: '' });

		expect(compareSpy).toHaveBeenCalledWith('', 'any_password');
	});

	test('Should throw InvalidUsernameOrPasswordError if password is invalid', async () => {
		const { sut, passwordComparator } = makeSut();
		spyOn(passwordComparator, 'compare').mockResolvedValueOnce(false);

		const promise = sut.invoke({ email: '', password: '' });

		expect(promise).rejects.toThrow(new InvalidUsernameOrPasswordError());
	});

	test('Should call session handler with correct values', async () => {
		const { sut, sessionHandler } = makeSut();
		const createSessionSpy = spyOn(sessionHandler, 'createSession');

		await sut.invoke({ email: '', password: '' });

		expect(createSessionSpy).toHaveBeenCalledWith('any_id');
	});

	test('Should return a sessionId on success', async () => {
		const { sut } = makeSut();

		const result = await sut.invoke({ email: '', password: '' });

		expect(result).toEqual({
			sessionId: 'any_session_id',
			emailVerified: false,
		});
	});
});
