import { CreationSuccessResponse } from '@gymclub/auth-api/utils/custom-responses';
import Elysia, { t } from 'elysia';
import { SignInUsecaseAdapter } from '../../../main/adapters/usecases/signin';

export const signInController = new Elysia().use(SignInUsecaseAdapter).post(
	'/signin',
	async ({ body, signIn }) => {
		const result = await signIn.invoke(body);

		return new CreationSuccessResponse({
			message: 'User logged in succesfully!',
			...result,
		});
	},
	{
		body: t.Object({
			email: t.String({
				format: 'email',
				error: 'The email is msising or invalid.',
			}),
			password: t.String({
				error: 'The password should be a string.',
			}),
		}),
	},
);
