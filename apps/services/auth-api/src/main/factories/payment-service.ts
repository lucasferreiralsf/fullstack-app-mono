import { dbClient } from '../../infra/clients';
import { stripe } from '../../infra/clients/stripe';
import { DefaultPaymentService } from '../../infra/payment/default-payment-service';
import { StripePaymentProviderService } from '../../infra/payment/stripe-payment-provider-service';
import { DrizzlePlanRepository } from '../../infra/plan/drizzle-plan-repository';
import { DrizzleSubscriptionRepository } from '../../infra/subscriptions/drizzle-subscriptions.repository';
import { DrizzleUserRepository } from '../../infra/user/drizzle-user-repository';

export const makePaymentService = () => {
	const paymentProviderService = new StripePaymentProviderService(stripe);
	const subscriptionRepository = new DrizzleSubscriptionRepository(dbClient);
	const userRepository = new DrizzleUserRepository(dbClient);
	const planRepository = new DrizzlePlanRepository(dbClient);

	return new DefaultPaymentService(
		paymentProviderService,
		subscriptionRepository,
		userRepository,
		planRepository,
	);
};
