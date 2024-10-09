export class LocationTimeoutError extends Error {
	constructor() {
		super('Location timeout');
		this.name = 'LocationTimeoutError';
	}
}
