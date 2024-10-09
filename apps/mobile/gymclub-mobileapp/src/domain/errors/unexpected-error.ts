export class UnexpectedError extends Error {
	constructor(message?: string) {
		super(message ?? 'Unexpected Error');
		this.name = 'UnexpectedError';
	}
}
