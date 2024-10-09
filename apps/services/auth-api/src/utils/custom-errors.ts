/* eslint-disable max-classes-per-file */

type DefaultErrorBody<T extends Object = {}> =
	| T
	| string
	| { message: string }
	| undefined;

export class DefaultError<T extends Object = {}> extends Error {
	status = 400;

	constructor(
		body: DefaultErrorBody<T> = 'Unexpected error.',
		status: number = 400,
	) {
		let parsedBody;

		if (typeof body === 'string') {
			parsedBody = body;
		} else if (body && typeof body === 'object' && 'message' in body) {
			parsedBody = body.message;
		} else {
			parsedBody = 'Unexpected error.';
		}

		super(parsedBody);

		this.name = 'DefaultError';
		this.status = status;
	}
}

export class InvalidSessionError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Unauthorized') {
		super(message);
		this.name = 'InvalidSessionError';
		this.status = 401;
	}
}

export class InvalidUsernameOrPasswordError<
	T extends Object = {},
> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Username or Password invalid.') {
		super(message);
		this.name = 'InvalidUsernameOrPasswordError';
		this.status = 401;
	}
}

export class BadRequestError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Bad request.') {
		super(message);
		this.name = 'BadRequestError';
		this.status = 400;
	}
}

export class InternalServerError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Internal server error.') {
		super(message);
		this.name = 'InternalServerError';
		this.status = 500;
	}
}

export class ConflictError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Conflict.') {
		super(message);
		this.name = 'ConflictError';
		this.status = 409;
	}
}

export class ResourceAlreadyExistsError<
	T extends Object = {},
> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Resource already exists.') {
		super(message);
		this.name = 'ResourceAlreadyExistsError';
		this.status = 409;
	}
}

export class DocumentNotFoundError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Document not found.') {
		super(message);
		this.name = 'DocumentNotFoundError';
		this.status = 404;
	}
}

export class PlanNotFoundError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Plan not found.') {
		super(message);
		this.name = 'PlanNotFoundError';
		this.status = 404;
	}
}

export class UserNotFoundError<T extends Object = {}> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'User not found.') {
		super(message);
		this.name = 'UserNotFoundError';
		this.status = 404;
	}
}

export class SubscriptionNotFoundError<
	T extends Object = {},
> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Subscription not found.') {
		super(message);
		this.name = 'SubscriptionNotFoundError';
		this.status = 404;
	}
}

export class PaymentMethodNotSetError<
	T extends Object = {},
> extends DefaultError {
	constructor(message: DefaultErrorBody<T> = 'Payment method not set.') {
		super(message);
		this.name = 'PaymentMethodNotSetError';
		this.status = 400;
	}
}
