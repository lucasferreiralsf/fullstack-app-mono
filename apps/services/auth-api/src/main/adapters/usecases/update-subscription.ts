import Elysia from 'elysia';
import { makeUpdateSubscription } from '../../factories/update-subscription';

export const UpdateSubscriptionUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		updateSubscription: makeUpdateSubscription(),
	}),
);
