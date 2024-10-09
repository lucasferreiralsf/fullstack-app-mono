import { ConflictError } from '@gymclub/auth-api/utils/custom-errors';
import { CreationSuccessResponse } from '@gymclub/auth-api/utils/custom-responses';
import Elysia, { t } from 'elysia';
import { SignUpUsecaseAdapter } from '../../../main/adapters/usecases/signup';

export const signUpController = new Elysia().use(SignUpUsecaseAdapter).post(
	'/signup',
	async ({ body, signUp }) => {
		const result = await signUp.invoke(body);

		if (!result.sentTo) {
			throw new ConflictError('Email is already in use.');
		}

		return new CreationSuccessResponse({
			message: `Account created and email verification code sent to ${result.sentTo}.`,
			sessionId: result.sessionId,
		});
	},
	{
		body: t.Object({
			firstName: t.String({
				error: 'The firstName should be a string.',
			}),
			lastName: t.String({
				error: 'The lastName should be a string.',
			}),
			email: t.String({
				format: 'email',
				error: 'The email should be a string.',
			}),
			password: t.String({
				error: 'The password is missing or invalid.',
				pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$',
			}),
			docNumber: t.String({
				error: 'Please enter a valid document number with exactly 9 digits.',
				pattern: '^\\d{9}$',
			}),
			tenantId: t.String({
				error: 'The tenantId should be a string.',
			}),
		}),
	},
);
