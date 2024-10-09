import Elysia from 'elysia';
import { makeGetSubscription } from '../../factories/get-subscription';

export const GetSubscriptionUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		getSubscription: makeGetSubscription(),
	}),
);
