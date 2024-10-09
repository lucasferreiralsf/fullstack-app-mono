import { CreationSuccessResponse } from '@gymclub/auth-api/utils/custom-responses';
import { Elysia } from 'elysia';
import { GetAvailablePlansUsecaseAdapter } from '../../../main/adapters/usecases/get-available-plans';
import { SessionDataProvider } from '../../../main/providers/session-data-provider';

export const plansController = new Elysia({ prefix: '/plans' })
	.use(GetAvailablePlansUsecaseAdapter)
	.use(SessionDataProvider)
	.get('/', async ({ getAvailablePlans }) => {
		const availablePlans = await getAvailablePlans.invoke();
		return new CreationSuccessResponse(availablePlans);
	});
