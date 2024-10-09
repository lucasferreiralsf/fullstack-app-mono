import { GymListType } from '../models/enums/gym-list-type';
import { GymModel } from '../models/gym';
import { LocationModel } from '../models/location';

export interface LoadGymList {
	loadGyms: <T extends GymListType>(
		listType: T,
		params: LoadGymListParams[T],
	) => Promise<GymModel[]>;
}

export interface LoadGymListParams {
	[GymListType.ALL]: null;
	[GymListType.GYMS_TOP_RATED]: null;
	[GymListType.GYMS_IN_YOUR_PLAN]: null;
	[GymListType.GYMS_NEARBY]: LocationModel;
}
