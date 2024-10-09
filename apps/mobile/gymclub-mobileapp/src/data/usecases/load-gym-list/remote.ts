import { HttpClient } from '@/data/interfaces/http/http-client';

import { AddressModel } from '@/domain/models/address';
import { GymListType } from '@/domain/models/enums/gym-list-type';
import { GymModel } from '@/domain/models/gym';
import { GymCategoryModel } from '@/domain/models/gym-category';
import { LoadGymList } from '@/domain/usecases/load-gym-list';

export class RemoteLoadGymList implements LoadGymList {
	constructor(
		private readonly url: string,
		private readonly client: HttpClient,
	) {}

	async loadGyms(listType?: GymListType): Promise<GymModel[]> {
		const url = listType ? `${this.url}/${listType}` : this.url;

		const response = await this.client.request<RemoteLoadGymListDto[]>({
			method: 'get',
			url,
		});

		return response.body;
	}
}

export interface RemoteLoadGymListDto {
	picture: string;
	name: string;
	address: AddressModel;
	category: GymCategoryModel;
	distance: number;
	isOpen: boolean;
	closingTime: string;
	rating: number;
}
