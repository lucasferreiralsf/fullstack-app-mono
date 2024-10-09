import { DefaultGetAvailablePlans } from '@/data/usecases/get-available-plans/default';
import { DefaultGetUserInfo } from '@/data/usecases/get-user-info/default';
import { DefaultGetUserSubscription } from '@/data/usecases/get-user-subscription/default';
import { DefaultRequestEmailVerificationCode } from '@/data/usecases/request-email-verification-code/default';
import { DefaultSignOut } from '@/data/usecases/signout/default';

import SplashPage from '@/presentation/pages/SplashPage';

import { makeSecureStorageAdapter } from '../adapters/secure-storage-adapter';
import { makeHttpClient } from '../http/http-client';

export const MakeSplashPage = (): React.JSX.Element => {
	const httpClient = makeHttpClient();
	const getUserInfo = new DefaultGetUserInfo(httpClient);
	const getUserSubscription = new DefaultGetUserSubscription(httpClient);
	const getAvailablePlans = new DefaultGetAvailablePlans(httpClient);
	const secureStore = makeSecureStorageAdapter();
	const signOut = new DefaultSignOut(secureStore);
	const requestEmailVerificationCode = new DefaultRequestEmailVerificationCode(
		httpClient,
	);

	return (
		<SplashPage
			getUserInfo={getUserInfo}
			getUserSubscription={getUserSubscription}
			getAvailablePlans={getAvailablePlans}
			signOut={signOut}
			requestEmailVerificationCode={requestEmailVerificationCode}
		/>
	);
};
