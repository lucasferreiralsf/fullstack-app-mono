import { passwordResetToken } from '@gymclub/db';
import { describe, expect, spyOn, test } from 'bun:test';
import { desc, eq } from 'drizzle-orm';
import { dbClient } from '../../../src/infra/clients';
import { DrizzlePasswordResetTokenRepository } from '../../../src/infra/verification-code/drizzle-password-reset-token-repository';

const makeSut = () => {
	const tokenExpirationTimeInHours = 1;
	const sut = new DrizzlePasswordResetTokenRepository(
		dbClient,
		tokenExpirationTimeInHours,
	);

	return {
		sut,
		client: dbClient,
		tokenExpirationTimeInHours,
	};
};

describe('DrizzlePasswordResetTokenRepository', () => {
	describe('findByUserId', () => {
		test('should return null if no record is found', async () => {
			const { sut, client } = makeSut();
			spyOn(client.query.passwordResetToken, 'findFirst').mockResolvedValueOnce(
				undefined,
			);

			const result = await sut.findByUserId('non_existent_user_id');

			expect(result).toBeNull();
		});

		test('should return the latest token record for the user', async () => {
			const { sut, client } = makeSut();
			const mockRecord = {
				userId: 'any_user_id',
				tokenHash: 'hashed_token',
				expiresAt: new Date(),
			};
			spyOn(client.query.passwordResetToken, 'findFirst').mockResolvedValueOnce(
				mockRecord,
			);

			const result = await sut.findByUserId('any_user_id');

			expect(result).toEqual(mockRecord);
			expect(client.query.passwordResetToken.findFirst).toHaveBeenCalledWith({
				where: eq(passwordResetToken.userId, 'any_user_id'),
				orderBy: desc(passwordResetToken.expiresAt),
			});
		});
	});
});
