import Elysia from 'elysia';
import { makeSignIn } from '../../factories/signin';

export const SignInUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		signIn: makeSignIn(),
	}),
);
