import Geolocation from '@react-native-community/geolocation';

import { GeolocationService } from '@/data/interfaces/geolocation-service';

import {
	LocationPermissionDeniedError,
	LocationTimeoutError,
	LocationUnavailableError,
	LocationUnexpectedError,
} from '@/domain/errors';
import { LocationModel } from '@/domain/models/location';

export class DefaultGeolocationService implements GeolocationService {
	constructor(private geolocationClient: typeof Geolocation) {}

	async getCurrentPosition(): Promise<LocationModel> {
		return new Promise((resolve, reject) => {
			this.geolocationClient.getCurrentPosition(
				(loc) => {
					resolve({
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
					});
				},
				(err) => {
					const errorMap = {
						[err.PERMISSION_DENIED]: new LocationPermissionDeniedError(),
						[err.POSITION_UNAVAILABLE]: new LocationUnavailableError(),
						[err.TIMEOUT]: new LocationTimeoutError(),
					};

					const error = errorMap[err.code] || new LocationUnexpectedError();
					reject(error);
				},
			);
		});
	}
}
