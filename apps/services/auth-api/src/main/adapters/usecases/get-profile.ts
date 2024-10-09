import Elysia from 'elysia';
import { makeGetProfile } from '../../factories/get-profile';

export const GetProfileUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		getProfile: makeGetProfile(),
	}),
);
