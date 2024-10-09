import { VerifyEmail } from '../../domain/usecases/verify-email';
import { makeUserRepository } from './user-repository';
import { makeVerificationCodeRepository } from './verification-code-repository';

export const makeVerifyEmail = () => {
	const userRepository = makeUserRepository();
	const verificationCodeRepository = makeVerificationCodeRepository();
	return new VerifyEmail(userRepository, verificationCodeRepository);
};
