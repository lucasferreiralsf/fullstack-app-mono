export class LocationUnavailableError extends Error {
	constructor() {
		super('Location unavailable');
		this.name = 'LocationUnavailableError';
	}
}
