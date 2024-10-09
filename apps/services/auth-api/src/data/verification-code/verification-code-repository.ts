import { EmailVerificationCodeTable } from '@gymclub/db';

export interface VerificationCodeRepository {
	create: (params: VerificationCodeCreateParams) => Promise<string>;

	findByCodeAndUserId: (
		code: string,
		userId: string,
	) => Promise<EmailVerificationCodeTable | null>;
}

export interface VerificationCodeCreateParams {
	userId: string;
	email: string;
	code: string;
}
