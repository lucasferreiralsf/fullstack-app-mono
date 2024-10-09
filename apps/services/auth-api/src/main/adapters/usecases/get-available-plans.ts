import Elysia from 'elysia';
import { makeGetAvailablePlans } from '../../factories/get-available-plans';

export const GetAvailablePlansUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		getAvailablePlans: makeGetAvailablePlans(),
	}),
);
