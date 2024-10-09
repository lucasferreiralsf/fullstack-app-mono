import { SubscriptionStatus } from '../../domain/enums/subscription-status';
import { SubscriptionModel } from '../../domain/models/subscription';

export interface SubscriptionRepository {
	create: (
		profileId: string,
		planId: string,
		providerSubscriptionId: string,
	) => Promise<SubscriptionModel>;

	updateStatusByProviderId: (
		providerSubscriptionId: string,
		status: SubscriptionStatus,
	) => Promise<void>;

	findByAthleteProfileId: (
		athleteProfileId: string,
	) => Promise<SubscriptionModel | null>;
}
