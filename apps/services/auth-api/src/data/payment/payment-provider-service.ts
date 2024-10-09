import { MembershipPlanModel } from '../../domain/models/membership-plan';
import { SubscriptionModel } from '../../domain/models/subscription';
import { UserAthleteModel } from '../../domain/models/user';

export interface PaymentProviderService {
	createExternalCustomer: (
		athlete: UserAthleteModel,
	) => Promise<CreateCustomerResult>;

	createExternalSubscription: (
		athlete: UserAthleteModel,
		plan: MembershipPlanModel,
	) => Promise<void>;

	updateSubscriptionPlan: (
		athlete: UserAthleteModel,
		subscription: SubscriptionModel,
		plan: MembershipPlanModel,
	) => Promise<void>;

	setPaymentMethod: (
		athlete: UserAthleteModel,
	) => Promise<SetPaymentMethodResult>;
}

export interface CreateCustomerResult {
	customerId: string;
}

export interface SetPaymentMethodResult {
	clientSecret: string;
}
