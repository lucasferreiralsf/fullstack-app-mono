import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';

import Button from '@/presentation/components/Button';
import PasswordFields from '@/presentation/components/PasswordFields';
import TermsAndPrivacy from '@/presentation/components/TermsAndPrivacy';
import Text from '@/presentation/components/Text';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';
import { useErrorHandling } from '@/presentation/hooks/use-error-handling';
import { validatePassword } from '@/presentation/validators/reset-password.ts/passwordValidation';

import { ForgotMyPasswordContext } from '../../store';
import ResetPasswordHeader from './components/ResetPasswordHeader';
import { ResetPasswordPageProps } from './types';

export default function ResetPasswordPage({
	resetPassword,
}: ResetPasswordPageProps) {
	const { userEmail, verificationCode } = useContext(ForgotMyPasswordContext);
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();

	const submitNewPassword = async () => {
		setErrorMessage('');
		setIsLoading(true);

		try {
			Keyboard.dismiss();

			validatePassword(password, confirmPassword);

			await resetPassword.run(verificationCode, userEmail, password);

			router.push({
				pathname: '/success',
				params: {
					title: 'Nova senha criada com sucesso',
					subtitle: 'Acessa o app com a tua nova senha.',
					buttonText: 'Avançar',
					onPressDestination: '/',
				},
			});
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView
			className="gap-6"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1, padding: 21 }}
		>
			<ResetPasswordHeader />

			<PasswordFields
				password={password}
				confirmPassword={confirmPassword}
				onPasswordChange={setPassword}
				onConfirmPasswordChange={setConfirmPassword}
			/>

			{errorMessage && (
				<Text className="text-red-400 mb-4 font-gymclub-bold">
					{errorMessage}
				</Text>
			)}

			<View className="flex-1" />

			<TermsAndPrivacy />

			<Button className="mt-6" disabled={isLoading} onPress={submitNewPassword}>
				{isLoading ? (
					<ThreeDotsLoading />
				) : (
					<Text className="text-gymclub-white font-gymclub-semi-bold">
						Criar nova senha
					</Text>
				)}
			</Button>
		</ScrollView>
	);
}
