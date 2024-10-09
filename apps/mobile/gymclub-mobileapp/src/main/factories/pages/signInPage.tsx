import { DefaultGetAvailablePlans } from '@/data/usecases/get-available-plans/default';
import { DefaultGetUserInfo } from '@/data/usecases/get-user-info/default';
import { DefaultGetUserSubscription } from '@/data/usecases/get-user-subscription/default';
import { DefaultRequestEmailVerificationCode } from '@/data/usecases/request-email-verification-code/default';
import { DefaultSignIn } from '@/data/usecases/signin/default';

import SignInPage from '@/presentation/pages/SignInPage';

import { makeSecureStorageAdapter } from '../adapters/secure-storage-adapter';
import { makeHttpClient } from '../http/http-client';

export function MakeSignInPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const secureStorage = makeSecureStorageAdapter();
	const getUserInfo = new DefaultGetUserInfo(httpClient);
	const getUserSubscription = new DefaultGetUserSubscription(httpClient);
	const getAvailablePlans = new DefaultGetAvailablePlans(httpClient);
	const signIn = new DefaultSignIn(httpClient, secureStorage);
	const requestEmailVerificationCode = new DefaultRequestEmailVerificationCode(
		httpClient,
	);

	return (
		<SignInPage
			getUserInfo={getUserInfo}
			getUserSubscription={getUserSubscription}
			getAvailablePlans={getAvailablePlans}
			signIn={signIn}
			requestEmailVerificationCode={requestEmailVerificationCode}
		/>
	);
}
