import { SubscriptionModel } from '../models/subscription';

export interface GetUserSubscription {
	run: () => Promise<SubscriptionModel | null>;
}
