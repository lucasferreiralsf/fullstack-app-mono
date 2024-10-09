import { GymModel } from '@/domain/models/gym';

export interface CategoryFilterProps {
	gyms: GymModel[];
	selectedCategory: number;
	onValueChange: (value: number) => void;
}
