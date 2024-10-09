export interface HttpClient {
	request: <R = unknown>(data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'delete' | 'get' | 'patch' | 'post' | 'put';

export enum HttpStatusCode {
	ok = 200,
	created = 201,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	conflict = 409,
	serverError = 500,
}

export interface HttpRequest {
	url: string;
	method: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
	params?: Record<string, string>;
}

export interface HttpResponse<T = unknown> {
	statusCode: HttpStatusCode;
	body: T;
}
