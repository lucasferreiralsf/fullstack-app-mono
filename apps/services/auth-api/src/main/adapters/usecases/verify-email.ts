import Elysia from 'elysia';
import { makeVerifyEmail } from '../../factories/verify-email';

export const VerifyEmailUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		verifyEmail: makeVerifyEmail(),
	}),
);
