import { RequestPasswordToken } from '../../domain/usecases/request-password-token';
import { env } from '../../env';
import { dbClient, emailClient } from '../../infra/clients';
import { BunEncrypter } from '../../infra/cryptography/bun-encrypter';
import { DefaultVerificationCodeGenerator } from '../../infra/verification-code/default-verification-code-generator';
import { DrizzlePasswordResetTokenRepository } from '../../infra/verification-code/drizzle-password-reset-token-repository';
import { PasswordVerificationCodeSender } from '../../infra/verification-code/password-verification-code-sender';
import { makeUserRepository } from './user-repository';

export const makeRequestPasswordToken = (): RequestPasswordToken => {
	const userRepository = makeUserRepository();
	const passwordTokenRepository = new DrizzlePasswordResetTokenRepository(
		dbClient,
		env.PASSWORD_RESET_TOKEN_EXPIRATION_TIME,
	);
	const verificationCodeGenerator = new DefaultVerificationCodeGenerator(
		env.PASSWORD_RESET_TOKEN_SIZE,
	);
	const verificationCodeSender = new PasswordVerificationCodeSender(
		emailClient,
	);
	const encrypter = new BunEncrypter();

	return new RequestPasswordToken(
		userRepository,
		passwordTokenRepository,
		verificationCodeGenerator,
		verificationCodeSender,
		encrypter,
	);
};
