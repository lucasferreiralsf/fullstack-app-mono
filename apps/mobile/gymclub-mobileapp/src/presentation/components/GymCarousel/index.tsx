import { Link } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { GymModel } from '@/domain/models/gym';

import GymCard from '@/presentation/components/GymCard';
import { GymCardProps } from '@/presentation/components/GymCard/types';
import Text from '@/presentation/components/Text';

import { GymCarouselProps } from './types';

export default function GymCarousel({
	gyms,
	listType,
	title,
}: GymCarouselProps) {
	function makeGymCardProps(gym: GymModel): GymCardProps {
		return {
			name: gym.name,
			address: gym.address.city,
			distanceInMeters: gym.distance,
			rating: gym.rating,
			isOpen: gym.isOpen,
			closingTime: gym.closingTime,
			image: gym.picture,
		};
	}

	if (gyms.length === 0) return null;

	return (
		<View className="flex-col gap-4">
			<View className="flex-row justify-between items-center px-6">
				<Text className="text-lg font-gymclub-semi-bold text-gymclub-black">
					{title}
				</Text>

				<Link
					className="font-gymclub-regular text-gymclub-blue-500"
					href={`/see-all-gyms/${listType}`}
				>
					Ver todos
				</Link>
			</View>

			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{gyms.map((gym, index) => (
					<GymCard
						className={`${index === 0 && 'ml-6'} w-96 mr-8`}
						key={index}
						{...makeGymCardProps(gym)}
					></GymCard>
				))}
			</ScrollView>
		</View>
	);
}
