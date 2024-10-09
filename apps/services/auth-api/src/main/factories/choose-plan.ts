import { ChoosePlan } from '../../domain/usecases/plan/choose-plan';
import { dbClient } from '../../infra/clients';
import { stripe } from '../../infra/clients/stripe';
import { StripePaymentProviderService } from '../../infra/payment/stripe-payment-provider-service';
import { DrizzlePlanRepository } from '../../infra/plan/drizzle-plan-repository';
import { makeSubscriptionRepository } from './subscription-repository';
import { makeUserRepository } from './user-repository';

export const makeChoosePlan = () => {
	const plansRepository = new DrizzlePlanRepository(dbClient);
	const userRepository = makeUserRepository();
	const subscriptionRepository = makeSubscriptionRepository();
	const paymentProviderService = new StripePaymentProviderService(stripe);

	const choosePlan = new ChoosePlan(
		plansRepository,
		userRepository,
		subscriptionRepository,
		paymentProviderService,
	);

	return choosePlan;
};
