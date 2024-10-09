import Elysia, { t } from 'elysia';
import Stripe from 'stripe';
import { SubscriptionStatus } from '../domain/enums/subscription-status';
import { env } from '../env';
import { stripe } from '../infra/clients/stripe';
import { PaymentServiceProvider } from '../main/adapters/payment-service';
import { UpdateSubscriptionUsecaseAdapter } from '../main/adapters/usecases/update-subscription';

const toSubscriptionStatus = (
	status: Stripe.Subscription.Status,
): SubscriptionStatus => {
	const statusMap: Record<string, SubscriptionStatus> = {
		active: SubscriptionStatus.ACTIVE,
		incomplete: SubscriptionStatus.PAYMENT_PENDING,
		incomplete_expired: SubscriptionStatus.PAYMENT_PENDING,
		past_due: SubscriptionStatus.PAYMENT_PENDING,
		unpaid: SubscriptionStatus.PAYMENT_PENDING,
		canceled: SubscriptionStatus.INACTIVE,
	};
	return statusMap[status as Stripe.Subscription.Status];
};

export const stripeController = new Elysia()
	.use(UpdateSubscriptionUsecaseAdapter)
	.use(PaymentServiceProvider)
	.post(
		'/webhooks/payment-provider',
		async ({ headers, request, updateSubscription, paymentService }) => {
			const arrayBuffer = await request.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const event = await stripe.webhooks.constructEventAsync(
				buffer,
				headers['stripe-signature'],
				env.STRIPE_WEBHOOK_SECRET,
			);

			switch (event.type) {
				case 'customer.subscription.created':
					await paymentService.subscribeAthlete(
						event.data.object.metadata.userId,
						event.data.object.id,
						event.data.object.items.data[0].price.metadata.sku,
					);
					break;
				case 'invoice.payment_succeeded':
					await updateSubscription.invoke({
						providerSubscriptionId: event.data.object.subscription as string,
						status: SubscriptionStatus.ACTIVE,
					});
					break;
				case 'customer.subscription.deleted':
					await updateSubscription.invoke({
						providerSubscriptionId: event.data.object.id,
						status: SubscriptionStatus.INACTIVE,
					});
					break;
				case 'customer.subscription.updated':
					await updateSubscription.invoke({
						providerSubscriptionId: event.data.object.id,
						status: toSubscriptionStatus(event.data.object.status),
					});
					break;
				default:
			}
		},
		{
			headers: t.Object({ 'stripe-signature': t.String() }),
		},
	);
