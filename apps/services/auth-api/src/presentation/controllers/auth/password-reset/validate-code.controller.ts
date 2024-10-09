import {
	BadRequestError,
	InternalServerError,
} from '@gymclub/auth-api/utils/custom-errors';
import { ok } from '@gymclub/utils';
import Elysia, { t } from 'elysia';
import { VerifyPasswordTokenUsecaseAdapter } from '../../../../main/adapters/usecases/verify-password-token';

export const validatePasswordCodeController = new Elysia()
	.use(VerifyPasswordTokenUsecaseAdapter)
	.post(
		'/validate-code',
		async ({ body, verifyPasswordToken }) => {
			const verificationStatus = await verifyPasswordToken.invoke(body);

			switch (verificationStatus) {
				case 'INVALID_EMAIL':
					throw new BadRequestError('Invalid email.');
				case 'INVALID_CODE':
					throw new BadRequestError('Invalid code.');
				case 'EXPIRED_CODE':
					throw new BadRequestError('Code expired.');
				case 'SUCCESS':
					return ok({ message: 'Token valid.' });
				default:
					return new InternalServerError();
			}
		},
		{
			body: t.Object({
				email: t.String({
					format: 'email',
					error: 'The email is missing or invalid.',
				}),
				token: t.String({
					error: 'Field token is missing or invalid.',
				}),
			}),
		},
	);
