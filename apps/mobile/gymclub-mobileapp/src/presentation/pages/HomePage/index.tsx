import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GymModel } from '@/domain/models/gym';

import GymCarousel from '@/presentation/components/GymCarousel';
import { GymClubLogo } from '@/presentation/components/icons';
import { SelectOption } from '@/presentation/components/Select/types';
import { titlePageMap } from '@/presentation/helpers/content-helpers';
import { useGymLists } from '@/presentation/hooks/use-gym-lists';
import { colors } from '@/presentation/styles/colors';

import CategoryFilter from './components/CategoryFilter';
import HomePageSkeleton from './components/HomePageSkeleton';
import LocationSelect from './components/LocationSelect';
import { HomePageProps } from './types';

const {
	gymclub: { black },
} = colors;

export default function HomePage({ loadGyms, getLocation }: HomePageProps) {
	const {
		gymsNearby,
		gymsInYourPlan,
		gymsTopRated,
		loadGymsNearby,
		loadGymsInYourPlan,
		loadGymsTopRated,
	} = useGymLists(loadGyms);
	const [selectedLocation, setSelectedLocation] = useState<SelectOption>();
	const [selectedCategory, setSelectedCategory] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const filterByLocation = (gym: GymModel) =>
		!selectedLocation ||
		selectedLocation.key === 'all' ||
		gym.address.addressId === Number(selectedLocation.key);

	const filterByCategory = (gym: GymModel) =>
		!selectedCategory || gym.category.categoryId === selectedCategory;

	const filterGyms = (gyms: GymModel[]) =>
		gyms.filter(filterByLocation).filter(filterByCategory);

	const filteredGyms = useMemo(
		() => ({
			[GymListType.GYMS_NEARBY]: filterGyms(gymsNearby),
			[GymListType.GYMS_IN_YOUR_PLAN]: filterGyms(gymsInYourPlan),
			[GymListType.GYMS_TOP_RATED]: filterGyms(gymsTopRated),
		}),
		[
			selectedLocation,
			selectedCategory,
			gymsNearby,
			gymsInYourPlan,
			gymsTopRated,
		],
	);

	async function load() {
		const location = await getLocation.getCurrentPosition();
		await Promise.all([
			loadGymsNearby(location),
			loadGymsInYourPlan(),
			loadGymsTopRated(),
		]);
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	return isLoading ? (
		<HomePageSkeleton />
	) : (
		<>
			<SafeAreaView>
				<GymClubLogo className="h-28 w-32 self-center" color={black} />
			</SafeAreaView>
			<View className="flex-1 flex-col gap-6 bg-gymclub-white">
				<LocationSelect
					gyms={Object.values(filteredGyms).flat()}
					onValueChange={setSelectedLocation}
				/>
				<CategoryFilter
					gyms={Object.values(filteredGyms).flat()}
					selectedCategory={selectedCategory}
					onValueChange={setSelectedCategory}
				/>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-col gap-10 pb-36 bg-gymclub-white">
						{Object.keys(filteredGyms).map((listType, index) => (
							<GymCarousel
								key={index}
								title={titlePageMap(listType as GymListType)}
								listType={listType as GymListType}
								gyms={filteredGyms[listType as keyof typeof filteredGyms]}
							/>
						))}
					</View>
				</ScrollView>
			</View>
		</>
	);
}
