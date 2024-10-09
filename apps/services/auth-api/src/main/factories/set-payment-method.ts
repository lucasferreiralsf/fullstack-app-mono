import { SetPaymentMethod } from '../../domain/usecases/set-payment-method';
import { stripe } from '../../infra/clients/stripe';
import { StripePaymentProviderService } from '../../infra/payment/stripe-payment-provider-service';
import { makeUserRepository } from './user-repository';

export const makeSetPaymentMethod = (): SetPaymentMethod => {
	const userRepository = makeUserRepository();
	const paymentProviderService = new StripePaymentProviderService(stripe);

	return new SetPaymentMethod(userRepository, paymentProviderService);
};
