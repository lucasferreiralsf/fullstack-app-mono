/* eslint-disable max-classes-per-file */

type DefaultResponseBody<T extends Object = {}> =
	| T
	| string
	| { message: string }
	| undefined;

const defaultHeaders = {
	'Content-Type': 'application/json; charset=utf-8',
};

export class DefaultResponse<T extends Object = {}> extends Response {
	constructor(body?: DefaultResponseBody<T>, init: ResponseInit = {}) {
		let parsedBody: DefaultResponseBody<T> = body;
		const defaultInit: ResponseInit = {
			headers: defaultHeaders,
			status: 200,
			...init,
		};
		if (typeof body === 'string') {
			parsedBody = { message: body };
		}

		super(parsedBody ? JSON.stringify(parsedBody) : undefined, defaultInit);
	}
}

export class CreationSuccessResponse<
	T extends Object = {},
> extends DefaultResponse<T> {
	constructor(
		message: DefaultResponseBody<T> = 'Resource successful created.',
		init: ResponseInit = {},
	) {
		super(message, { headers: defaultHeaders, status: 201, ...init });
	}
}
