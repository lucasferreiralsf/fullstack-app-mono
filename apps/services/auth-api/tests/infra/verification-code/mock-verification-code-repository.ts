import { EmailVerificationCodeTable } from '@gymclub/db';
import { VerificationCodeRepository } from '../../../src/data/verification-code/verification-code-repository';

export class MockVerificationCodeRepository
	implements VerificationCodeRepository
{
	async create(): Promise<string> {
		return 'any_code';
	}

	async findByCodeAndUserId(): Promise<EmailVerificationCodeTable | null> {
		return {
			id: 'any_id',
			code: 'any_code',
			email: 'any_email@gmail.com',
			userId: 'any_user_id',
			expiresAt: new Date(),
		};
	}
}
