import { RequestVerificationCode } from '../../domain/usecases/request-verification-code';
import { env } from '../../env';
import { emailClient } from '../../infra/clients';
import { DefaultVerificationCodeGenerator } from '../../infra/verification-code/default-verification-code-generator';
import { EmailVerificationCodeSender } from '../../infra/verification-code/email-verification-code-sender';
import { makeUserRepository } from './user-repository';
import { makeVerificationCodeRepository } from './verification-code-repository';

export const makeGetVerificationCode = () => {
	const verificationCodeSender = new EmailVerificationCodeSender(emailClient);
	const verificationCodeGenerator = new DefaultVerificationCodeGenerator(
		env.EMAIL_VERIFICATION_CODE_LENGTH,
	);
	const verificationCodeRepository = makeVerificationCodeRepository();
	const userRepository = makeUserRepository();

	return new RequestVerificationCode(
		verificationCodeSender,
		verificationCodeGenerator,
		verificationCodeRepository,
		userRepository,
	);
};
