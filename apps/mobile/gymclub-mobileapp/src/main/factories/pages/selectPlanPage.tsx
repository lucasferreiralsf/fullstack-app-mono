import { DefaultGetAvailablePlans } from '@/data/usecases/get-available-plans/default';

import SelectPlanPage from '@/presentation/pages/SelectPlanPage';

import { makeHttpClient } from '../http/http-client';

export function MakeSelectPlanPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const getAvailablePlans = new DefaultGetAvailablePlans(httpClient);
	return <SelectPlanPage getAvailablePlans={getAvailablePlans} />;
}
