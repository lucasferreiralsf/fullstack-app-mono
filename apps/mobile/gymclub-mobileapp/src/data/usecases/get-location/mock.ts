import { LocationModel } from '@/domain/models/location';
import { GetLocation } from '@/domain/usecases/get-location';

export class MockGetLocation implements GetLocation {
	async getCurrentPosition(): Promise<LocationModel> {
		return { latitude: 30, longitude: 30 };
	}
}
