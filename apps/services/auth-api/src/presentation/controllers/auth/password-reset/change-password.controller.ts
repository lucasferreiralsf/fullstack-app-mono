import {
	BadRequestError,
	InternalServerError,
} from '@gymclub/auth-api/utils/custom-errors';
import { ok } from '@gymclub/utils';
import Elysia, { t } from 'elysia';
import { ResetPasswordUsecaseAdapter } from '../../../../main/adapters/usecases/reset-password';
import { VerifyPasswordTokenUsecaseAdapter } from '../../../../main/adapters/usecases/verify-password-token';

export const changePasswordController = new Elysia()
	.use(VerifyPasswordTokenUsecaseAdapter)
	.use(ResetPasswordUsecaseAdapter)
	.post(
		'/change',
		async ({ body, verifyPasswordToken, resetPassword }) => {
			const { email, token, password } = body;
			const verificationStatus = await verifyPasswordToken.invoke({
				token,
				email,
			});
			if (verificationStatus !== 'SUCCESS') {
				throw new BadRequestError(verificationStatus);
			}

			const resetStatus = await resetPassword.invoke({
				email,
				password,
			});
			switch (resetStatus) {
				case 'INVALID_EMAIL':
					throw new BadRequestError('Invalid email.');
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
				password: t.String({
					error: 'Field oldPassword is missing or invalid.',
				}),
			}),
		},
	);
