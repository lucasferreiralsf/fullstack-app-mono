import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GymModel } from '@/domain/models/gym';
import { GymCategoryModel } from '@/domain/models/gym-category';

import CategoryPill from '../CategoryPill';
import { CategoryFilterProps } from './types';

export default function CategoryFilter({
	gyms,
	selectedCategory,
	onValueChange,
}: CategoryFilterProps) {
	const [gymCategories, setGymCategories] = useState<GymCategoryModel[]>([]);

	const setUniqueGymCategories = (gymsReponse: GymModel[]) => {
		const uniqueCategories: GymCategoryModel[] = [];
		const categoriesIds = new Set();

		gymsReponse.forEach((gym) => {
			if (!categoriesIds.has(gym.category.categoryId)) {
				categoriesIds.add(gym.category.categoryId);
				uniqueCategories.push(gym.category);
			}
		});

		setGymCategories(uniqueCategories);
	};

	useEffect(() => {
		setUniqueGymCategories(gyms);
	}, []);

	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<CategoryPill
					onPress={() => void onValueChange(0)}
					selected={selectedCategory === 0}
					className="ml-6"
					label="Todas"
				/>
				{gymCategories.map((category, index) => (
					<CategoryPill
						key={index}
						onPress={() => void onValueChange(category.categoryId)}
						selected={selectedCategory === category.categoryId}
						label={category.name}
					/>
				))}
			</ScrollView>
		</View>
	);
}
