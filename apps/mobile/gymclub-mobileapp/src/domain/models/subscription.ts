import { SubscriptionStatus } from './enums/subscription-status';

export interface SubscriptionModel {
	status: SubscriptionStatus;
	id: string;
	planId: string;
	athleteProfileId: string;
	providerSubscriptionId: string;
	startDate: Date;
	endDate: Date;
}
