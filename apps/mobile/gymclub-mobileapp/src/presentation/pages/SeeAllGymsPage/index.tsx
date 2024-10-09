import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GymModel } from '@/domain/models/gym';

import GenericHeader from '@/presentation/components/GenericHeader';
import GymCard from '@/presentation/components/GymCard';
import { GymCardProps } from '@/presentation/components/GymCard/types';
import { ArrowLeftIcon } from '@/presentation/components/icons';
import { titlePageMap } from '@/presentation/helpers/content-helpers';

import { SeeAllGymsPageProps } from './types';

export default function SeeAllGymsPage({
	loadGyms,
	getLocation,
	listType,
}: SeeAllGymsPageProps) {
	const navigation = useNavigation();
	const [gyms, setGyms] = useState<GymModel[]>([]);

	function makeGymCardProps(gym: GymModel): GymCardProps {
		return {
			name: gym.name,
			address: gym.address.city,
			distanceInMeters: gym.distance,
			rating: gym.rating,
			isOpen: gym.isOpen,
			isCompact: true,
			closingTime: gym.closingTime,
			image: gym.picture,
		};
	}

	async function load() {
		let payload = null;

		if (listType === GymListType.GYMS_NEARBY) {
			const location = await getLocation.getCurrentPosition();
			if (location) payload = location;
		}

		const response = await loadGyms.loadGyms(listType, payload);
		setGyms(response);
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<View className="bg-gymclub-white flex-1">
			<GenericHeader
				title={titlePageMap(listType)}
				leftIcon={
					<TouchableOpacity onPress={() => void navigation.goBack()}>
						<ArrowLeftIcon className="w-10 h-10" />
					</TouchableOpacity>
				}
			/>

			<View className="flex-col gap-6 mb-24">
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-col gap-4 pb-36 items-center">
						{gyms.map((gym, index) => (
							<GymCard
								className="mx-6"
								key={index}
								{...makeGymCardProps(gym)}
							></GymCard>
						))}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}
