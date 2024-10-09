import { PasswordResetTokenTable } from '@gymclub/db';
import { PasswordResetTokenRepository } from '../../../src/data/verification-code/password-reset-token-repository';

export class MockPasswordTokenRepository
	implements PasswordResetTokenRepository
{
	async create(userId: string, token: string): Promise<void> {}

	async findByUserId(userId: string): Promise<PasswordResetTokenTable | null> {
		return {
			userId: 'any_user_id',
			tokenHash: 'any_token_hash',
			expiresAt: new Date(),
		};
	}
}
