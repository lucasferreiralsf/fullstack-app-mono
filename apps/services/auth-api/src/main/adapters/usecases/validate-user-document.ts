import Elysia from 'elysia';
import { makeValidateUserDocument } from '../../factories/validate-user-document';

export const ValidateUserDocumentUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		validateUserDocument: makeValidateUserDocument(),
	}),
);
