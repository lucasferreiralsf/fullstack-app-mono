import Elysia from 'elysia';
import { makeResetPassword } from '../../factories/reset-password';

export const ResetPasswordUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		resetPassword: makeResetPassword(),
	}),
);
