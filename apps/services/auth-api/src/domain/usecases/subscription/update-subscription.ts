import { Usecase } from '@gymclub/utils';
import { SubscriptionRepository } from '../../../data/subscription/subscription-repository';
import { SubscriptionStatus } from '../../enums/subscription-status';

export class UpdateSubscription implements Usecase<Params, Result> {
	constructor(
		private readonly subscriptionRepository: SubscriptionRepository,
	) {}

	async invoke(params: Params): Promise<Result> {
		const { providerSubscriptionId, status } = params;

		await this.subscriptionRepository.updateStatusByProviderId(
			providerSubscriptionId,
			status,
		);
	}
}

interface Params {
	providerSubscriptionId: string;
	status: SubscriptionStatus;
}

type Result = void;
