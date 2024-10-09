import {
	BadRequestError,
	InternalServerError,
} from '@gymclub/auth-api/utils/custom-errors';
import { ok } from '@gymclub/utils';
import Elysia, { t } from 'elysia';
import { VerifyEmailUsecaseAdapter } from '../../../../main/adapters/usecases/verify-email';

export const validateCodeController = new Elysia()
	.use(VerifyEmailUsecaseAdapter)
	.post(
		'/validate-code',
		async ({ body, verifyEmail }) => {
			const verificationStatus = await verifyEmail.invoke({
				email: body.email,
				code: body.code,
			});

			switch (verificationStatus) {
				case 'ALREADY_VERIFIED':
					return ok({ message: 'Email already verified.' });
				case 'INVALID_CODE':
					throw new BadRequestError('Invalid code.');
				case 'EXPIRED_CODE':
					throw new BadRequestError('Code expired.');
				case 'SUCCESS':
					return ok({ message: 'Email verified.' });
				default:
					return new InternalServerError();
			}
		},
		{
			body: t.Object({
				code: t.String({
					error: 'Field code is missing or invalid.',
				}),
				email: t.String({
					format: 'email',
					error: 'The email should be a string.',
				}),
			}),
		},
	);
