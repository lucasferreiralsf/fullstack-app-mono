import Elysia from 'elysia';
import { makeVerifyPasswordToken } from '../../factories/verify-password-token';

export const VerifyPasswordTokenUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		verifyPasswordToken: makeVerifyPasswordToken(),
	}),
);
