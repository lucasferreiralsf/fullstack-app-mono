import { describe, expect, spyOn, test } from 'bun:test';
import { dbClient } from '../../../src/infra/clients';
import { DrizzleVerificationCodeRepository } from '../../../src/infra/verification-code/drizzle-verification-code-repository';

const makeSut = () => new DrizzleVerificationCodeRepository(dbClient, 10);

describe('DrizzleVerificationCodeRepository', () => {
	const UUID = '9150823e-eb0f-4afa-b7ff-b708f92add55';
	describe('create', () => {
		test('should call db client with correct values', async () => {
			const sut = makeSut();
			const transactionSpy = spyOn(dbClient, 'transaction');
			await sut.create({
				userId: UUID,
				email: 'email',
				code: 'code',
			});
			expect(transactionSpy).toHaveBeenCalled();
		});
	});

	describe('findByCodeAndUserId', () => {
		test('should call db client with correct values', async () => {
			const sut = makeSut();
			const findFirstSpy = spyOn(
				dbClient.query.emailVerificationCode,
				'findFirst',
			);
			await sut.findByCodeAndUserId('code', UUID);
			expect(findFirstSpy).toHaveBeenCalled();
		});

		test('should return null if dbClient does not find a record', async () => {
			const sut = makeSut();
			spyOn(
				dbClient.query.emailVerificationCode,
				'findFirst',
			).mockResolvedValueOnce(undefined);
			const result = await sut.findByCodeAndUserId('code', UUID);
			expect(result).toBe(null);
		});

		test('should return a record if dbClient finds a record', async () => {
			const date = new Date();
			const sut = makeSut();
			spyOn(
				dbClient.query.emailVerificationCode,
				'findFirst',
			).mockResolvedValueOnce({
				id: 'e8facacd-9d6f-4e5b-a7b9-2392d6b43240',
				userId: '9150823e-eb0f-4afa-b7ff-b708f92add55',
				expiresAt: date,
				code: 'code',
				email: 'email',
			});

			const result = await sut.findByCodeAndUserId('code', UUID);

			expect(result).toEqual({
				id: 'e8facacd-9d6f-4e5b-a7b9-2392d6b43240',
				userId: '9150823e-eb0f-4afa-b7ff-b708f92add55',
				expiresAt: date,
				code: 'code',
				email: 'email',
			});
		});
	});
});
