import { DefaultRequestPasswordResetToken } from '@/data/usecases/request-password-reset-token/default';

import CheckEmailPage from '@/presentation/pages/ForgotMyPassword/pages/CheckEmailPage';

import { makeHttpClient } from '../http/http-client';

export function MakeCheckEmailPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const requestPasswordResetToken = new DefaultRequestPasswordResetToken(
		httpClient,
	);

	return (
		<CheckEmailPage requestPasswordResetToken={requestPasswordResetToken} />
	);
}
