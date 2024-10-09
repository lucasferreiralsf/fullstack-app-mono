export class LocationPermissionDeniedError extends Error {
	constructor() {
		super('Location permission denied');
		this.name = 'LocationPermissionDeniedError';
	}
}
