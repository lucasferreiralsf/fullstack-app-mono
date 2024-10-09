import {
	DbClientTransaction,
	emailVerificationCode,
	EmailVerificationCodeTable,
} from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { and, eq } from 'drizzle-orm';
import { createDate, TimeSpan } from 'oslo';
import {
	VerificationCodeCreateParams,
	VerificationCodeRepository,
} from '../../data/verification-code/verification-code-repository';

export class DrizzleVerificationCodeRepository
	implements VerificationCodeRepository
{
	constructor(
		private readonly client: DrizzleDbClient,
		private readonly codeExpirationTimeInMinutes: number,
	) {}

	async findByCodeAndUserId(
		code: string,
		userId: string,
	): Promise<EmailVerificationCodeTable | null> {
		const record = await this.client.query.emailVerificationCode.findFirst({
			where: and(
				eq(emailVerificationCode.code, code),
				eq(emailVerificationCode.userId, userId),
			),
		});
		return record ?? null;
	}

	async create(params: VerificationCodeCreateParams): Promise<string> {
		const { userId, email, code } = params;
		const verificationCode = await this.client.transaction(
			async (transaction) => {
				await this.deleteExistingVerificationCode(transaction, userId);

				await this.registerCode(transaction, { code, email, userId });

				return code;
			},
		);
		return verificationCode;
	}

	private async deleteExistingVerificationCode(
		transaction: DbClientTransaction,
		userId: string,
	) {
		await transaction
			.delete(emailVerificationCode)
			.where(eq(emailVerificationCode.userId, userId));
	}

	private async registerCode(
		transaction: DbClientTransaction,
		params: RegisterCodeParams,
	) {
		const { code, email, userId } = params;
		const values = {
			code,
			email,
			expiresAt: createDate(
				new TimeSpan(this.codeExpirationTimeInMinutes, 'm'),
			),
			userId,
		};

		await transaction.insert(emailVerificationCode).values(values);
	}
}

interface RegisterCodeParams {
	code: string;
	email: string;
	userId: string;
}
