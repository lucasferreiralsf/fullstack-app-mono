import { maskEmail, Usecase } from '@gymclub/utils';
import { Encrypter } from '../../data/cryptography/encrypter';
import { UserRepository } from '../../data/user/user-repository';
import { PasswordResetTokenRepository } from '../../data/verification-code/password-reset-token-repository';
import { VerificationCodeGenerator } from '../../data/verification-code/verification-code-generator';
import { VerificationCodeSender } from '../../data/verification-code/verification-code-sender';

export class RequestPasswordToken implements Usecase<Params, Result> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordTokenRepository: PasswordResetTokenRepository,
		private readonly verificationCodeGenerator: VerificationCodeGenerator,
		private readonly verificationSender: VerificationCodeSender,
		private readonly encrypter: Encrypter,
	) {}

	async invoke({ email }: Params): Promise<Result> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}

		const code = await this.verificationCodeGenerator.generate();
		const hashCode = await this.encrypter.encrypt(code);

		await this.passwordTokenRepository.create(user.id, hashCode);

		this.verificationSender.sendEmail(code, email);
		return { email: maskEmail(email) };
	}
}

interface Params {
	email: string;
}

interface Result {
	email: string;
}
