import { GetAvailablePlans } from '../../domain/usecases/plan/get-available-plans';
import { dbClient } from '../../infra/clients';
import { DrizzlePlanRepository } from '../../infra/plan/drizzle-plan-repository';

export const makeGetAvailablePlans = () => {
	const plansRepository = new DrizzlePlanRepository(dbClient);
	return new GetAvailablePlans(plansRepository);
};
