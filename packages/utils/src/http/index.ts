import { InternalServerError } from 'elysia';
import { HttpResponse } from './interfaces';

export const badRequest = (error: Error): HttpResponse<Error> => ({
	status: 400,
	body: error,
});

export const serverError = (error: Error): HttpResponse<Error> => ({
	status: 500,
	body: new InternalServerError(error.stack ?? ''),
});

export const ok = <T>(data: T): HttpResponse<T> => ({
	status: 200,
	body: data,
});
