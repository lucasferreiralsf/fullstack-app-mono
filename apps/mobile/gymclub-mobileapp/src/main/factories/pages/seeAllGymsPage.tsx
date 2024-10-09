import { MockGetLocation } from '@/data/usecases/get-location/mock';
import { MockLoadGymList } from '@/data/usecases/load-gym-list/mock';

import { GymListType } from '@/domain/models/enums/gym-list-type';

import SeeAllGymsPage from '@/presentation/pages/SeeAllGymsPage';

export function MakeSeeAllGymsPage({
	listType,
}: {
	listType: GymListType;
}): React.JSX.Element {
	const mockLoadGyms = new MockLoadGymList();
	const mockGetLocation = new MockGetLocation();

	return (
		<SeeAllGymsPage
			loadGyms={mockLoadGyms}
			listType={listType}
			getLocation={mockGetLocation}
		/>
	);
}
