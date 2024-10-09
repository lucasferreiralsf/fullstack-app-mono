import { ResetPassword } from '../../domain/usecases/reset-password';
import { BunEncrypter } from '../../infra/cryptography/bun-encrypter';
import { makeUserRepository } from './user-repository';

export const makeResetPassword = () => {
	const userRepository = makeUserRepository();
	const encrypter = new BunEncrypter();
	return new ResetPassword(userRepository, encrypter);
};
