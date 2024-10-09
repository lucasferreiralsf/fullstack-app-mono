import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GetLocation } from '@/domain/usecases/get-location';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export interface SeeAllGymsPageProps {
	loadGyms: LoadGymList;
	getLocation: GetLocation;
	listType: GymListType;
}
