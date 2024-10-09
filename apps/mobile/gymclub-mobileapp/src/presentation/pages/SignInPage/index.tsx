import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
	Animated,
	Image,
	KeyboardAvoidingView,
	Platform,
	View,
} from 'react-native';

import Button from '@/presentation/components/Button';
import { GymClubLogo } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';
import { useAnimatedValue } from '@/presentation/hooks/use-animated';
import { useAuthRedirect } from '@/presentation/hooks/use-auth-redirect';
import { useErrorHandling } from '@/presentation/hooks/use-error-handling';
import { useKeyboard } from '@/presentation/hooks/use-keyboard';

import LoginFields from './components/LoginFields';
import { RegisterLink } from './components/RegisterLink';
import WelcomeHeader from './components/WelcomeHeader';
import { SignInPageProps } from './types';

export default function SignInPage({
	getUserInfo,
	getUserSubscription,
	getAvailablePlans,
	signIn,
	requestEmailVerificationCode,
}: SignInPageProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();
	const { redirectUser } = useAuthRedirect(
		getUserInfo,
		getUserSubscription,
		requestEmailVerificationCode,
		getAvailablePlans,
	);

	const { isKeyboardVisible } = useKeyboard();
	const animatedFlex = useAnimatedValue(isKeyboardVisible, 2, 3.5);

	const validateSignInPayload = () => {
		if (email.length === 0) {
			throw new Error('Preencha o e-mail');
		}
		if (password.length === 0) {
			throw new Error('Preencha a senha');
		}
	};

	const goToAccountVerification = async () => {
		await requestEmailVerificationCode.run(email);
		router.navigate('/signup/verify-account-code');
	};

	const onEnterPress = async () => {
		try {
			setErrorMessage('');
			setIsLoading(true);

			validateSignInPayload();

			const response = await signIn.run(email, password);

			response!.emailVerified
				? await redirectUser()
				: await goToAccountVerification();
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className="flex-1 bg-gymclub-white"
		>
			<Animated.View style={{ flex: animatedFlex, position: 'relative' }}>
				<Image
					source={require('@/assets/login-bg.png')}
					className="bg-center h-full w-full"
				/>
				<GymClubLogo className="h-52 w-52 absolute top-1/2 left-1/2 shadow-lg -translate-x-1/2 transform -translate-y-1/2" />
			</Animated.View>

			<View className="flex-5 px-6 items-center justify-center">
				<View className="w-full gap-6">
					<WelcomeHeader />

					<View className="gap-4">
						<LoginFields
							email={email}
							password={password}
							setEmail={setEmail}
							setPassword={setPassword}
						/>

						{errorMessage && (
							<Text className="text-red-400 font-gymclub-bold">
								{errorMessage}
							</Text>
						)}

						<Link
							className="text-gymclub-blue-600 font-gymclub-semi-bold text-sm"
							href={`/forgot-my-password/check-email`}
						>
							Esqueci minha senha
						</Link>
					</View>

					<Button
						disabled={isLoading}
						onPress={() => {
							onEnterPress();
						}}
					>
						{isLoading ? (
							<ThreeDotsLoading />
						) : (
							<Text className="text-gymclub-white font-gymclub-semi-bold">
								Entrar
							</Text>
						)}
					</Button>

					<View className="border-t border-gymclub-gray-200 w-full h-0.5"></View>

					<RegisterLink />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
