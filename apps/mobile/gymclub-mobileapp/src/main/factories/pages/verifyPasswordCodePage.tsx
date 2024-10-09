import { DefaultRequestPasswordResetToken } from '@/data/usecases/request-password-reset-token/default';
import { DefaultValidatePasswordResetToken } from '@/data/usecases/validate-password-reset-token/default';

import VerifyPasswordCodePage from '@/presentation/pages/VerifyCode/pages/VerifyPasswordCodePage';

import { makeHttpClient } from '../http/http-client';

export function MakeVerifyPasswordCodePage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const requestPasswordResetToken = new DefaultRequestPasswordResetToken(
		httpClient,
	);
	const validatePasswordResetToken = new DefaultValidatePasswordResetToken(
		httpClient,
	);

	return (
		<VerifyPasswordCodePage
			validatePasswordResetToken={validatePasswordResetToken}
			requestPasswordResetToken={requestPasswordResetToken}
		/>
	);
}
