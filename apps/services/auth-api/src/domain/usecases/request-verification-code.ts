import { maskEmail, Usecase } from '@gymclub/utils';
import { UserRepository } from '../../data/user/user-repository';
import { VerificationCodeGenerator } from '../../data/verification-code/verification-code-generator';
import { VerificationCodeRepository } from '../../data/verification-code/verification-code-repository';
import { VerificationCodeSender } from '../../data/verification-code/verification-code-sender';

interface RequestVerificationCodeParams {
	email: string;
}

interface RequestVerificationCodeResult {
	email: string;
}

export type RequestVerificationCodeUsecase = Usecase<
	RequestVerificationCodeParams,
	RequestVerificationCodeResult
>;

export class RequestVerificationCode
	implements
		Usecase<RequestVerificationCodeParams, RequestVerificationCodeResult>
{
	constructor(
		private readonly verificationSender: VerificationCodeSender,
		private readonly verificationCodeGenerator: VerificationCodeGenerator,
		private readonly verificationCodeRepository: VerificationCodeRepository,
		private readonly userRepository: UserRepository,
	) {}

	async invoke({
		email,
	}: RequestVerificationCodeParams): Promise<RequestVerificationCodeResult> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}

		const code = await this.verificationCodeGenerator.generate();

		await this.verificationCodeRepository.create({
			userId: user.id,
			email,
			code,
		});

		this.verificationSender.sendEmail(code, email);
		return { email: maskEmail(email) };
	}
}
