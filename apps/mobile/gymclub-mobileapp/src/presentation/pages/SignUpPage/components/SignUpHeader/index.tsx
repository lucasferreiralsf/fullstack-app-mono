import { router } from 'expo-router';

import LeftTextHeader from '@/presentation/components/LeftTextHeader';

import { SignUpHeaderProps } from './types';

export default function SignUpHeader({ goToLogin = false }: SignUpHeaderProps) {
	const handleOnPress = () => {
		goToLogin ? void router.replace('/signin') : void router.back();
	};

	return <LeftTextHeader title="Registrar" onPress={handleOnPress} />;
}
