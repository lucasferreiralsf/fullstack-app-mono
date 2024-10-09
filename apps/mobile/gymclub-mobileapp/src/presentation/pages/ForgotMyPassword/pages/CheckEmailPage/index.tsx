import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { View } from 'react-native';

import Button from '@/presentation/components/Button';
import TermsAndPrivacy from '@/presentation/components/TermsAndPrivacy';
import Text from '@/presentation/components/Text';
import TextInput from '@/presentation/components/TextInput';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';
import { useErrorHandling } from '@/presentation/hooks/use-error-handling';

import { ForgotMyPasswordContext } from '../../store';
import ForgotMyPasswordHeader from './components/ForgotMyPasswordHeader';
import { CheckEmailPageProps } from './types';

export default function CheckEmailPage({
	requestPasswordResetToken,
}: CheckEmailPageProps) {
	const { setUserEmail } = useContext(ForgotMyPasswordContext);
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();

	const handleSendCode = async () => {
		try {
			setErrorMessage('');
			setIsLoading(true);

			await requestPasswordResetToken.run(email);
			setUserEmail(email);

			router.navigate('/forgot-my-password/verify-password-code');
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className="flex-1 p-6">
			<ForgotMyPasswordHeader />

			<TextInput
				autoCapitalize="none"
				keyboardType="email-address"
				label="Email"
				placeholder="exemplo@email.com"
				value={email}
				onChangeText={setEmail}
			/>

			{errorMessage && (
				<Text className="text-red-400 mt-6 font-gymclub-bold">
					{errorMessage}
				</Text>
			)}

			<View className="flex-1" />

			<TermsAndPrivacy />

			<Button
				className="mt-6"
				disabled={isLoading || !email}
				onPress={handleSendCode}
			>
				{isLoading ? (
					<ThreeDotsLoading />
				) : (
					<Text className="text-gymclub-white font-gymclub-semi-bold">
						Enviar código
					</Text>
				)}
			</Button>
		</View>
	);
}
