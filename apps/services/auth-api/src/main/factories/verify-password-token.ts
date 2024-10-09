import { VerifyPasswordToken } from '../../domain/usecases/verify-password-token';
import { env } from '../../env';
import { dbClient } from '../../infra/clients';
import { BunPasswordComparator } from '../../infra/cryptography/bun-password-comparator';
import { DrizzlePasswordResetTokenRepository } from '../../infra/verification-code/drizzle-password-reset-token-repository';
import { makeUserRepository } from './user-repository';

export const makeVerifyPasswordToken = (): VerifyPasswordToken => {
	const userRepository = makeUserRepository();
	const passwordResetTokenRepository = new DrizzlePasswordResetTokenRepository(
		dbClient,
		env.PASSWORD_RESET_TOKEN_EXPIRATION_TIME,
	);
	const hashComparator = new BunPasswordComparator();

	return new VerifyPasswordToken(
		userRepository,
		passwordResetTokenRepository,
		hashComparator,
	);
};
