import { LocationModel } from '../models/location';

export interface GetLocation {
	getCurrentPosition: () => Promise<LocationModel>;
}
