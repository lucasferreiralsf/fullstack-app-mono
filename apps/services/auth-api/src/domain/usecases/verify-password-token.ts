import { Usecase } from '@gymclub/utils';
import { isWithinExpirationDate } from 'oslo';
import { PasswordComparator } from '../../data/cryptography/password-comparator';
import { UserRepository } from '../../data/user/user-repository';
import { PasswordResetTokenRepository } from '../../data/verification-code/password-reset-token-repository';

export class VerifyPasswordToken implements Usecase<Params, Result> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
		private readonly hashComparator: PasswordComparator,
	) {}

	async invoke({ token, email }: Params): Promise<Result> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			return 'INVALID_EMAIL';
		}

		const record = await this.passwordResetTokenRepository.findByUserId(
			user.id,
		);

		const hashedToken = record?.tokenHash ?? '';
		const tokensMatch = await this.hashComparator.compare(token, hashedToken);

		if (!record || !tokensMatch) {
			return 'INVALID_CODE';
		}

		if (!isWithinExpirationDate(record.expiresAt)) {
			return 'EXPIRED_CODE';
		}

		return 'SUCCESS';
	}
}

interface Params {
	token: string;
	email: string;
}

type Result = 'EXPIRED_CODE' | 'INVALID_CODE' | 'INVALID_EMAIL' | 'SUCCESS';
