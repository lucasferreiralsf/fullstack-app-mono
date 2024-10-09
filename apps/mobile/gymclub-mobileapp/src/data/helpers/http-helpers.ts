import {
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import {
	AccessDeniedError,
	BadRequestError,
	ConflictError,
	InvalidCredentialsError,
	NotFoundError,
	UnexpectedError,
} from '@/domain/errors';

export const handleHttpResponse = <T>(response: HttpResponse<T>) => {
	if (response.statusCode < 400) return handleSuccessResponse(response);
	return handleErrorResponse(response);
};

const handleSuccessResponse = <T>(response: HttpResponse<T>) => {
	if (response.statusCode === HttpStatusCode.noContent) {
		return { ...response, body: null };
	}

	return response;
};

const handleErrorResponse = <T>(response: HttpResponse) => {
	const body = response.body as T & { message?: string };
	switch (response.statusCode) {
		case HttpStatusCode.forbidden:
			throw new AccessDeniedError(body?.message);
		case HttpStatusCode.unauthorized:
			throw new InvalidCredentialsError(body?.message);
		case HttpStatusCode.notFound:
			throw new NotFoundError(body?.message);
		case HttpStatusCode.conflict:
			throw new ConflictError(body?.message);
		case HttpStatusCode.serverError:
			throw new UnexpectedError(body?.message);
		case HttpStatusCode.badRequest:
			throw new BadRequestError(body?.message);
		default:
			throw new UnexpectedError(body?.message);
	}
};
