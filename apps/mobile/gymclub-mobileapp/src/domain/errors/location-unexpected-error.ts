export class LocationUnexpectedError extends Error {
	constructor() {
		super('Something went wrong while getting the location.');
		this.name = 'LocationUnexpectedError';
	}
}
