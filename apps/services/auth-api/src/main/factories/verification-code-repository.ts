import { VerificationCodeRepository } from '../../data/verification-code/verification-code-repository';
import { env } from '../../env';
import { dbClient } from '../../infra/clients';
import { DrizzleVerificationCodeRepository } from '../../infra/verification-code/drizzle-verification-code-repository';

export const makeVerificationCodeRepository = (): VerificationCodeRepository =>
	new DrizzleVerificationCodeRepository(
		dbClient,
		env.EMAIL_VERIFICATION_CODE_EXPIRATION_TIME,
	);
