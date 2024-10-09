import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { Loading } from '@/presentation/components/Loading';
import { useAuthRedirect } from '@/presentation/hooks/use-auth-redirect';

import { SplashPageProps } from './types';

export default function SplashPage({
	getUserInfo,
	getUserSubscription,
	getAvailablePlans,
	signOut,
	requestEmailVerificationCode,
}: SplashPageProps) {
	const [authChecked, setAuthChecked] = useState(false);
	const { redirectUser } = useAuthRedirect(
		getUserInfo,
		getUserSubscription,
		requestEmailVerificationCode,
		getAvailablePlans,
	);

	const checkAuth = async () => {
		try {
			await redirectUser();
		} catch {
			await signOut.run();
			return void router.replace('/signin');
		} finally {
			setAuthChecked(true);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	if (!authChecked) return <Loading />;
}
