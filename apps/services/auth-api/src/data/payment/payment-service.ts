import { UserAthleteModel } from '../../domain/models/user';

export interface PaymentService {
	createCustomer: (user: UserAthleteModel) => Promise<void>;

	subscribeAthlete: (
		providerCustomerId: string,
		providerSubscriptionId: string,
		planSku: string,
	) => Promise<void>;
}

export interface CreateSubscriptionResult {
	clientSecret: string;
}
