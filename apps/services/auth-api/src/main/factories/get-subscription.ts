import { GetSubscription } from '../../domain/usecases/subscription/get-subscription';
import { dbClient } from '../../infra/clients';
import { DrizzleSubscriptionRepository } from '../../infra/subscriptions/drizzle-subscriptions.repository';
import { DrizzleUserRepository } from '../../infra/user/drizzle-user-repository';

export const makeGetSubscription = () => {
	const subscriptionRepository = new DrizzleSubscriptionRepository(dbClient);
	const userRepository = new DrizzleUserRepository(dbClient);
	return new GetSubscription(subscriptionRepository, userRepository);
};
