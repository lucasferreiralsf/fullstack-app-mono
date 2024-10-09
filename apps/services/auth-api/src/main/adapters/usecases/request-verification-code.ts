import Elysia from 'elysia';
import { makeGetVerificationCode } from '../../factories/request-verification-code';

export const RequesVerificationCodeUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		requestVerificationCode: makeGetVerificationCode(),
	}),
);
