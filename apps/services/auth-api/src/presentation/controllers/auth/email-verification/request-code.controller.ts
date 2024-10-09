import { DefaultResponse } from '@gymclub/auth-api/utils/custom-responses';
import Elysia, { t } from 'elysia';
import { RequesVerificationCodeUsecaseAdapter } from '../../../../main/adapters/usecases/request-verification-code';

export const requestCodeController = new Elysia()
	.use(RequesVerificationCodeUsecaseAdapter)
	.post(
		'/request',
		async ({ requestVerificationCode, body }) => {
			const { email } = await requestVerificationCode.invoke({
				email: body.email,
			});
			return new DefaultResponse({
				message: `Email verification code sent to ${email}.`,
			});
		},
		{
			body: t.Object({
				email: t.String({
					format: 'email',
					error: 'The email is missing or invalid.',
				}),
			}),
		},
	);
