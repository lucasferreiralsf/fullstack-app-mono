import Elysia from 'elysia';
import { makeChoosePlan } from '../../factories/choose-plan';

export const ChoosePlanUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		choosePlan: makeChoosePlan(),
	}),
);
