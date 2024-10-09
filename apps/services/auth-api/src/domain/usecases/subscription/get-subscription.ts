import {
	SubscriptionNotFoundError,
	UserNotFoundError,
} from '@gymclub/auth-api/utils/custom-errors';
import { Usecase } from '@gymclub/utils';
import { SubscriptionRepository } from '../../../data/subscription/subscription-repository';
import { UserRepository } from '../../../data/user/user-repository';
import { SubscriptionModel } from '../../models/subscription';

export class GetSubscription implements Usecase<Params, SubscriptionModel> {
	constructor(
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly userRepository: UserRepository,
	) {}

	async invoke({ userId }: Params): Promise<SubscriptionModel> {
		const user = await this.userRepository.findAthleteByUserId(userId);
		const athleteProfileId = user?.profile.id;

		if (!athleteProfileId) throw new UserNotFoundError();

		const result =
			await this.subscriptionRepository.findByAthleteProfileId(
				athleteProfileId,
			);

		if (!result) throw new SubscriptionNotFoundError();

		return result;
	}
}

interface Params {
	userId: string;
}
