import { SubscriptionRepository } from '../../../src/data/subscription/subscription-repository';
import { SubscriptionStatus } from '../../../src/domain/enums/subscription-status';
import { SubscriptionModel } from '../../../src/domain/models/subscription';

export const mockSubscription = {
	id: '1',
	planId: '1',
	athleteProfileId: '1',
	providerSubscriptionId: 'any_id',
	startDate: new Date(),
	endDate: new Date(),
	status: SubscriptionStatus.ACTIVE,
};

export class MockSubscriptionRepository implements SubscriptionRepository {
	async create(): Promise<SubscriptionModel> {
		return mockSubscription;
	}

	async updateStatusByProviderId(): Promise<void> {}

	async findByAthleteProfileId(): Promise<SubscriptionModel | null> {
		return mockSubscription;
	}
}
