import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GymModel } from '@/domain/models/gym';

export interface GymCarouselProps {
	gyms: GymModel[];
	listType: GymListType;
	title?: string;
}
