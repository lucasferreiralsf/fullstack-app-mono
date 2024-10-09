import { DefaultResponse } from '@gymclub/auth-api/utils/custom-responses';
import Elysia, { t } from 'elysia';
import { RequestPasswordTokenUsecaseAdapter } from '../../../../main/adapters/usecases/request-password-token';

export const requestPasswordCodeController = new Elysia()
	.use(RequestPasswordTokenUsecaseAdapter)
	.post(
		'/request',
		async ({ body, requestPasswordToken }) => {
			const { email } = await requestPasswordToken.invoke(body);
			return new DefaultResponse({
				message: `A verification code to reset your password was sent to ${email}.`,
			});
		},
		{
			body: t.Object({
				email: t.String({
					format: 'email',
					error: 'The email is msising or invalid.',
				}),
			}),
		},
	);
