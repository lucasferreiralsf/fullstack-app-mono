import { useLocalSearchParams } from 'expo-router';

import { GymListType } from '@/domain/models/enums/gym-list-type';

import { MakeSeeAllGymsPage } from '@/main/factories/pages/seeAllGymsPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidListType = (value: any): value is GymListType =>
	Object.values(GymListType).includes(value);

export default function SeeAllGymsPage() {
	const { listType } = useLocalSearchParams();

	const validatedListType = isValidListType(listType)
		? listType
		: GymListType.GYMS_TOP_RATED;

	return <MakeSeeAllGymsPage listType={validatedListType} />;
}
