import { DefaultGetUserInfo } from '@/data/usecases/get-user-info/default';
import { DefaultRequestEmailVerificationCode } from '@/data/usecases/request-email-verification-code/default';
import { DefaultValidateEmail } from '@/data/usecases/validate-email/default';

import VerifyAccountCodePage from '@/presentation/pages/VerifyCode/pages/VerifyAccountCodePage';

import { makeHttpClient } from '../http/http-client';

export function MakeVerifyAccountCodePage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const getUserInfo = new DefaultGetUserInfo(httpClient);
	const validateEmail = new DefaultValidateEmail(httpClient);
	const requestEmailVerificationCode = new DefaultRequestEmailVerificationCode(
		httpClient,
	);

	return (
		<VerifyAccountCodePage
			getUserInfo={getUserInfo}
			validateEmail={validateEmail}
			requestEmailVerificationCode={requestEmailVerificationCode}
		/>
	);
}
