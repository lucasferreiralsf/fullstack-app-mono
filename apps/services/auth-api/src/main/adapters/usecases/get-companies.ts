import Elysia from 'elysia';
import { makeGetCompanies } from '../../factories/get-companies';

export const GetCompaniesUsecaseAdapter = new Elysia().derive(
	{ as: 'global' },
	() => ({
		getCompanies: makeGetCompanies(),
	}),
);
