import { CreationSuccessResponse } from '@gymclub/auth-api/utils/custom-responses';
import { Elysia, t } from 'elysia';
import { ChoosePlanUsecaseAdapter } from '../../../main/adapters/usecases/choose-plan';
import { GetProfileUsecaseAdapter } from '../../../main/adapters/usecases/get-profile';
import { GetSubscriptionUsecaseAdapter } from '../../../main/adapters/usecases/get-subscription';
import { SetPaymentMethodProvider } from '../../../main/adapters/usecases/set-payment-method';
import { SessionDataProvider } from '../../../main/providers/session-data-provider';

export const usersController = new Elysia({ prefix: '/users' })
	.use(ChoosePlanUsecaseAdapter)
	.use(GetProfileUsecaseAdapter)
	.use(GetSubscriptionUsecaseAdapter)
	.use(SetPaymentMethodProvider)
	.use(SessionDataProvider)
	.get('/profile', async ({ getProfile, loggedUser }) => {
		const user = await getProfile.invoke({ id: loggedUser.id });

		return new CreationSuccessResponse({ ...user });
	})
	.get('/subscription', async ({ getSubscription, loggedUser }) => {
		const subscription = await getSubscription.invoke({
			userId: loggedUser.id,
		});

		return new CreationSuccessResponse({ ...subscription });
	})
	.patch(
		'/plan',
		async ({ choosePlan, body, loggedUser }) => {
			await choosePlan.invoke({
				userId: loggedUser.id,
				planId: body.planId,
			});
			return new CreationSuccessResponse();
		},
		{
			body: t.Object({
				planId: t.String(),
			}),
		},
	)
	.post('/payment-method', async ({ setPaymentMethod, loggedUser }) => {
		const result = await setPaymentMethod.invoke({
			userId: loggedUser.id,
		});
		return new CreationSuccessResponse({ ...result });
	});
