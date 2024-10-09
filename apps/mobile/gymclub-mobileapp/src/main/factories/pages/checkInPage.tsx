import { MockGetLocation } from '@/data/usecases/get-location/mock';
import { MockLoadGymList } from '@/data/usecases/load-gym-list/mock';

import CheckInPage from '@/presentation/pages/CheckInPage';

export function MakeCheckInPage(): React.JSX.Element {
	const mockLoadGymsNearby = new MockLoadGymList();
	const mockGetLocation = new MockGetLocation();

	return (
		<CheckInPage loadGyms={mockLoadGymsNearby} getLocation={mockGetLocation} />
	);
}
