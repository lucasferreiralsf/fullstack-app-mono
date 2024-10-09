import { DefaultChoosePlan } from '@/data/usecases/choose-plan/default';
import { DefaultSetPaymentMethod } from '@/data/usecases/set-payment-method/default';

import PaymentPage from '@/presentation/pages/PaymentPage';

import { makeHttpClient } from '../http/http-client';

export function MakePaymentPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const choosePlan = new DefaultChoosePlan(httpClient);
	const setPaymentMethod = new DefaultSetPaymentMethod(httpClient);

	return (
		<PaymentPage choosePlan={choosePlan} setPaymentMethod={setPaymentMethod} />
	);
}
