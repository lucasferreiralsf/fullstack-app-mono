import { passwordResetToken, PasswordResetTokenTable } from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { desc, eq } from 'drizzle-orm';
import { createDate, TimeSpan } from 'oslo';
import { PasswordResetTokenRepository } from '../../data/verification-code/password-reset-token-repository';

export class DrizzlePasswordResetTokenRepository
	implements PasswordResetTokenRepository
{
	constructor(
		private readonly client: DrizzleDbClient,
		private readonly tokenExpirationTimeInHours: number,
	) {}

	async create(userId: string, token: string): Promise<void> {
		await this.client.transaction(async (transaction) => {
			await transaction
				.delete(passwordResetToken)
				.where(eq(passwordResetToken.userId, userId));

			await transaction.insert(passwordResetToken).values({
				expiresAt: createDate(
					new TimeSpan(this.tokenExpirationTimeInHours, 'h'),
				),
				tokenHash: token,
				userId,
			});
		});
	}

	async findByUserId(userId: string): Promise<PasswordResetTokenTable | null> {
		const record = await this.client.query.passwordResetToken.findFirst({
			where: eq(passwordResetToken.userId, userId),
			orderBy: desc(passwordResetToken.expiresAt),
		});
		return record ?? null;
	}
}
