import { makeDbClient } from '@gymclub/db';
import { CompanyEmployeeRepository } from '../../data/company-employee/company-employee-repository';
import { env } from '../../env';
import { DrizzleCompanyEmployeeRepository } from '../../infra/company-employee/drizzle-company-employee-repository';

export const makeCompanyEmployeeRepository = (): CompanyEmployeeRepository => {
	const dbClient = makeDbClient(env.DB_URL);
	return new DrizzleCompanyEmployeeRepository(dbClient);
};
