import { SubscriptionStatus } from '@/domain/models/enums/subscription-status';
import { SubscriptionModel } from '@/domain/models/subscription';
import { GetUserSubscription } from '@/domain/usecases/get-user-subscription';

export class MockGetUserSubscription implements GetUserSubscription {
	async run(): Promise<SubscriptionModel | null> {
		return {
			id: '1',
			planId: '2',
			athleteProfileId: '3',
			providerSubscriptionId: '4',
			status: SubscriptionStatus.ACTIVE,
			startDate: new Date(),
			endDate: new Date(),
		};
	}
}
