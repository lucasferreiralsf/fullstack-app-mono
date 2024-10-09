import { router } from 'expo-router';
import { useCallback } from 'react';

import { SubscriptionStatus } from '@/domain/models/enums/subscription-status';
import { GetAvailablePlans } from '@/domain/usecases/get-available-plans';
import { GetUserInfo } from '@/domain/usecases/get-user-info';
import { GetUserSubscription } from '@/domain/usecases/get-user-subscription';
import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';

export const useAuthRedirect = (
	getUserInfo: GetUserInfo,
	getUserSubscription: GetUserSubscription,
	requestEmailVerificationCode: RequestEmailVerificationCode,
	getAvailablePlans: GetAvailablePlans,
) => {
	const redirectUser = useCallback(async () => {
		const user = await getUserInfo.run();
		if (!user) throw new Error();

		const subscription = await getUserSubscription.run();

		if (!user.emailVerified) {
			await requestEmailVerificationCode.run(user.email);
			router.push('/signup/verify-account-code');
			return;
		}

		if (!subscription || subscription.status === SubscriptionStatus.INACTIVE) {
			router.push('/select-plan');
			return;
		}

		if (subscription.status === SubscriptionStatus.ACTIVE) {
			router.push('/home');
			return;
		}
		const plans = await getAvailablePlans.run();
		const plan = plans.find((p) => p.id === subscription.planId)!;
		router.push({
			pathname: '/payment-page',
			params: { ...plan, backUrl: '/home' },
		});
	}, [getUserInfo, getUserSubscription, requestEmailVerificationCode]);

	return { redirectUser };
};
