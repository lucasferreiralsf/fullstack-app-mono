import { AddressModel } from './address';
import { GymCategoryModel } from './gym-category';

export interface GymModel {
	picture: string;
	name: string;
	address: AddressModel;
	category: GymCategoryModel;
	distance: number;
	isOpen: boolean;
	closingTime: string;
	rating: number;
}
