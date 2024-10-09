import { DefaultResetPassword } from '@/data/usecases/reset-password/default';

import ResetPasswordPage from '@/presentation/pages/ForgotMyPassword/pages/ResetPasswordPage';

import { makeHttpClient } from '../http/http-client';

export function MakeResetPasswordPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const resetPassword = new DefaultResetPassword(httpClient);

	return <ResetPasswordPage resetPassword={resetPassword} />;
}
