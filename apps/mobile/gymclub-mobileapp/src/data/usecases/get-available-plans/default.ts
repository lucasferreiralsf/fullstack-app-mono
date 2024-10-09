import { HttpClient } from '@/data/interfaces/http/http-client';

import { PlanSku } from '@/domain/models/enums/plan-sku';
import { MembershipPlan } from '@/domain/models/membership-plan';
import { GetAvailablePlans } from '@/domain/usecases/get-available-plans';

export class DefaultGetAvailablePlans implements GetAvailablePlans {
	constructor(private readonly client: HttpClient) {}

	async run(): Promise<MembershipPlan[]> {
		const response = await this.client.request<GetAvailablePlansDto[]>({
			method: 'get',
			url: '/plans',
		});

		return response.body.sort((a, b) => a.price - b.price);
	}
}

export interface GetAvailablePlansDto {
	id: string;
	price: number;
	name: string;
	description: string;
	sku: PlanSku;
}
