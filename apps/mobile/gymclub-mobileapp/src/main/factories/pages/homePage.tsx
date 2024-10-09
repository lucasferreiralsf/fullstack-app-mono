import { MockGetLocation } from '@/data/usecases/get-location/mock';
import { MockLoadGymList } from '@/data/usecases/load-gym-list/mock';

import HomePage from '@/presentation/pages/HomePage';

export function MakeHomePage(): React.JSX.Element {
	const mockLoadGyms = new MockLoadGymList();
	const mockGetLocation = new MockGetLocation();

	return <HomePage loadGyms={mockLoadGyms} getLocation={mockGetLocation} />;
}
