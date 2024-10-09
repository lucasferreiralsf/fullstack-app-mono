import { GetLocation } from '@/domain/usecases/get-location';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export interface HomePageProps {
	loadGyms: LoadGymList;
	getLocation: GetLocation;
}
