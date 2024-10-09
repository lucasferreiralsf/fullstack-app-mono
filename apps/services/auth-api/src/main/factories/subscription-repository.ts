import { SubscriptionRepository } from '../../data/subscription/subscription-repository';
import { dbClient } from '../../infra/clients';
import { DrizzleSubscriptionRepository } from '../../infra/subscriptions/drizzle-subscriptions.repository';

export const makeSubscriptionRepository = (): SubscriptionRepository =>
	new DrizzleSubscriptionRepository(dbClient);
