import { UpdateSubscription } from '../../domain/usecases/subscription/update-subscription';
import { dbClient } from '../../infra/clients';
import { DrizzleSubscriptionRepository } from '../../infra/subscriptions/drizzle-subscriptions.repository';

export const makeUpdateSubscription = () => {
	const subscriptionRepository = new DrizzleSubscriptionRepository(dbClient);
	return new UpdateSubscription(subscriptionRepository);
};
