import { GetLocation } from '@/domain/usecases/get-location';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export interface CheckInPageProps {
	loadGyms: LoadGymList;
	getLocation: GetLocation;
}
