import { HttpClient } from '@/data/interfaces/http/http-client';

import { SubscriptionStatus } from '@/domain/models/enums/subscription-status';
import { SubscriptionModel } from '@/domain/models/subscription';
import { GetUserSubscription } from '@/domain/usecases/get-user-subscription';

export class DefaultGetUserSubscription implements GetUserSubscription {
	constructor(private readonly client: HttpClient) {}

	async run(): Promise<SubscriptionModel | null> {
		try {
			const response = await this.client.request<GetUserSubscriptionDto>({
				method: 'get',
				url: '/users/subscription',
			});
			return response.body;
		} catch {
			return null;
		}
	}
}

export interface GetUserSubscriptionDto {
	status: SubscriptionStatus;
	id: string;
	planId: string;
	athleteProfileId: string;
	providerSubscriptionId: string;
	startDate: Date;
	endDate: Date;
}
