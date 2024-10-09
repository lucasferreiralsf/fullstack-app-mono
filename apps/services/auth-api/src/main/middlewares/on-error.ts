import { DefaultError } from '@gymclub/auth-api/utils/custom-errors';
import Elysia from 'elysia';

export const onErrorMiddleware = (app: Elysia) =>
	app.onError(({ error }) => {
		// eslint-disable-next-line no-console
		console.error(error);
		if (error instanceof DefaultError) {
			return {
				message: error.message,
				status: error.status,
			};
		}
		return {
			message: error.message,
			status: 500,
		};
	});
