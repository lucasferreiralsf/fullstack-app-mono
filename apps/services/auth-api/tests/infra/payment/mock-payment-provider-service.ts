import { PaymentProviderService } from '../../../src/data/payment/payment-provider-service';

export const mockPaymentProviderService: PaymentProviderService = {
	async createExternalCustomer() {
		return {
			customerId: 'any_customer_id',
		};
	},

	async createExternalSubscription() {},

	async updateSubscriptionPlan() {},

	async setPaymentMethod() {
		return {
			clientSecret: 'any_client_secret',
		};
	},
};
