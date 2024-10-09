import { GeolocationService } from '@/data/interfaces/geolocation-service';

import { LocationModel } from '@/domain/models/location';
import { GetLocation } from '@/domain/usecases/get-location';

export class DefaultGetLocation implements GetLocation {
	constructor(private geolocationService: GeolocationService) {}

	async getCurrentPosition(): Promise<LocationModel> {
		return this.geolocationService.getCurrentPosition();
	}
}
