import {
	AccessDeniedError,
	ConflictError,
	InvalidCredentialsError,
	NotFoundError,
	UnexpectedError,
} from '@/domain/errors';

import { HttpStatusCode } from '../interfaces/http/http-client';
import { handleHttpResponse } from './http-helpers';

describe('http-helpers', () => {
	describe('handleHttpResponse', () => {
		test.each([
			[HttpStatusCode.forbidden, new AccessDeniedError('error_message')],
			[
				HttpStatusCode.unauthorized,
				new InvalidCredentialsError('error_message'),
			],
			[HttpStatusCode.notFound, new NotFoundError('error_message')],
			[HttpStatusCode.conflict, new ConflictError('error_message')],
			[HttpStatusCode.badRequest, new UnexpectedError('error_message')],
			[HttpStatusCode.serverError, new UnexpectedError('error_message')],
		])(
			'Should throw %t error when response status is %s',
			async (test, expected) => {
				const httpResponse = {
					statusCode: test,
					body: { message: 'error_message' },
				};

				try {
					handleHttpResponse(httpResponse);
				} catch (error) {
					expect(error).toEqual(expected);
				}
			},
		);

		test.each([
			[
				HttpStatusCode.ok,
				{ statusCode: HttpStatusCode.ok, body: { message: 'any_message' } },
			],
			[
				HttpStatusCode.created,
				{ statusCode: 201, body: { message: 'any_message' } },
			],
			[HttpStatusCode.noContent, { body: null, statusCode: 204 }],
		])(
			'Should return %test when response status is %expected',
			async (test, expected) => {
				const httpResponse = {
					statusCode: test,
					body: { message: 'any_message' },
				};

				const result = handleHttpResponse(httpResponse);
				expect(result).toEqual(expected);
			},
		);
	});
});
