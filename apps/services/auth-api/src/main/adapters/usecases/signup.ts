import Elysia from 'elysia';
import { makeSignUp } from '../../factories/signup';

export const SignUpUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		signUp: makeSignUp(),
	}),
);
