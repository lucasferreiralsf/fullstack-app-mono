import { Usecase } from '@gymclub/utils';
import { isWithinExpirationDate } from 'oslo';
import { UserRepository } from '../../data/user/user-repository';
import { VerificationCodeRepository } from '../../data/verification-code/verification-code-repository';

export class VerifyEmail
	implements Usecase<VerifyEmailParams, VerifyEmailResult>
{
	constructor(
		private readonly userRepository: UserRepository,
		private readonly verificationCodeRepository: VerificationCodeRepository,
	) {}

	async invoke({ code, email }: VerifyEmailParams): Promise<VerifyEmailResult> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			return 'INVALID_EMAIL';
		}
		if (user.emailVerified) {
			return 'ALREADY_VERIFIED';
		}

		const record = await this.verificationCodeRepository.findByCodeAndUserId(
			code,
			user.id,
		);

		if (!record) {
			return 'INVALID_CODE';
		}

		if (!isWithinExpirationDate(record.expiresAt)) {
			return 'EXPIRED_CODE';
		}

		await this.userRepository.updateEmailVerified(email);
		return 'SUCCESS';
	}
}

interface VerifyEmailParams {
	code: string;
	email: string;
}

type VerifyEmailResult =
	| 'ALREADY_VERIFIED'
	| 'EXPIRED_CODE'
	| 'INVALID_CODE'
	| 'INVALID_EMAIL'
	| 'SUCCESS';
