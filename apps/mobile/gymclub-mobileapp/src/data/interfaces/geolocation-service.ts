import { LocationModel } from '@/domain/models/location';

export interface GeolocationService {
	getCurrentPosition: () => Promise<LocationModel>;
}
