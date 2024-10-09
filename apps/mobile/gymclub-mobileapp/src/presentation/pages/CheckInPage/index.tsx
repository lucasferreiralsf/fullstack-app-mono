import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GymModel } from '@/domain/models/gym';

import GymCard from '@/presentation/components/GymCard';
import { GymCardProps } from '@/presentation/components/GymCard/types';
import { HistoryIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';
import { useGymLists } from '@/presentation/hooks/use-gym-lists';

import { CheckInPageProps } from './types';

export default function CheckInPage({
	loadGyms,
	getLocation,
}: CheckInPageProps) {
	const { gymsNearby, loadGymsNearby } = useGymLists(loadGyms);
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
		const location = await getLocation.getCurrentPosition();
		await loadGymsNearby(location);
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	return isLoading ? (
		<View></View>
	) : (
		<View className="h-screen flex-col">
			<View className="flex-row justify-between items-center mb-6 px-6">
				<Text className="text-lg font-gymclub-semi-bold text-gymclub-black">
					Ginásios por Perto
				</Text>

				<View className="flex-row items-center justify-center gap-1">
					<HistoryIcon className="h-5 w-5" />
					<Link
						className="font-gymclub-regular text-gymclub-blue-500"
						href={`/checkin-history`}
					>
						Histórico
					</Link>
				</View>
			</View>

			<View className="flex-1 flex-col gap-6 bg-gymclub-white">
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-col gap-4 pb-36 items-center bg-gymclub-white">
						{gymsNearby.map((gym, index) => (
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
