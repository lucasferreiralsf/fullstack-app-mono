import { PaymentMethodNotSetError } from '@gymclub/auth-api/utils/custom-errors';
import type Stripe from 'stripe';
import {
	CreateCustomerResult,
	PaymentProviderService,
	SetPaymentMethodResult,
} from '../../data/payment/payment-provider-service';
import { MembershipPlanModel } from '../../domain/models/membership-plan';
import { SubscriptionModel } from '../../domain/models/subscription';
import { UserAthleteModel } from '../../domain/models/user';

export class StripePaymentProviderService implements PaymentProviderService {
	constructor(private readonly stripe: Stripe) {}

	async createExternalCustomer(
		user: UserAthleteModel,
	): Promise<CreateCustomerResult> {
		const customer = await this.stripe.customers.create({
			name: `${user.firstName} ${user.lastName}`,
			email: user.email,
			metadata: {
				userId: user.id,
				athleteId: user.profile.id,
			},
		});

		return { customerId: customer.id };
	}

	async createExternalSubscription(
		user: UserAthleteModel,
		plan: MembershipPlanModel,
	): Promise<void> {
		const price = await this.getPrice(plan.sku);
		const paymentMethods = await this.stripe.paymentMethods.list({
			customer: user.profile.providerCustomerId!,
		});

		const paymentMethodId = paymentMethods.data.at(0)?.id;
		if (!paymentMethodId) {
			throw new PaymentMethodNotSetError();
		}

		await this.stripe.subscriptions.create({
			customer: user.profile.providerCustomerId!,
			items: [{ price }],
			default_payment_method: paymentMethodId,
			metadata: {
				userId: user.id,
				athleteId: user.profile.id,
			},
		});
	}

	async updateSubscriptionPlan(
		athlete: UserAthleteModel,
		subscription: SubscriptionModel,
		plan: MembershipPlanModel,
	): Promise<void> {
		const [price, stripeSubscription] = await Promise.all([
			this.getPrice(plan.sku),
			this.getSubscription(athlete.id),
		]);

		await this.stripe.subscriptions.update(
			subscription.providerSubscriptionId,
			{
				items: [
					{
						id: stripeSubscription.items.data[0].id,
						price,
					},
				],
				expand: ['latest_invoice.payment_intent'],
			},
		);
	}

	async setPaymentMethod(
		athlete: UserAthleteModel,
	): Promise<SetPaymentMethodResult> {
		const customerId = athlete.profile.providerCustomerId!;
		const intent = await this.stripe.setupIntents.create({
			customer: customerId,
			usage: 'off_session',
			automatic_payment_methods: { enabled: true },
		});

		return { clientSecret: intent.client_secret! };
	}

	private async getPrice(sku: string) {
		const price = await this.stripe.prices.search({
			query: `metadata["sku"]:"${sku}"`,
		});

		const priceId = price.data.at(0)?.id;
		if (!priceId) {
			throw new Error('Price not found');
		}
		return priceId;
	}

	private async getSubscription(userId: string): Promise<Stripe.Subscription> {
		const result = await this.stripe.subscriptions.search({
			query: `metadata["userId"]:"${userId}"`,
		});

		const sub = result.data.at(0);
		if (!sub) {
			throw new Error('Subscription not found');
		}

		return sub;
	}
}
