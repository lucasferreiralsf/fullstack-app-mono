import Elysia from 'elysia';
import { makeRequestPasswordToken } from '../../factories/request-password-token';

export const RequestPasswordTokenUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		requestPasswordToken: makeRequestPasswordToken(),
	}),
);
