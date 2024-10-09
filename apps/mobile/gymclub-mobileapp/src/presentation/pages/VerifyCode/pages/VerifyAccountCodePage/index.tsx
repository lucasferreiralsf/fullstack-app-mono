import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { useErrorHandling } from '@/presentation/hooks/use-error-handling';

import VerifyCodeView from '../../components/VerifyCodeView';
import { VerifyAccountCodePageProps } from './types';

export default function VerifyAccountCodePage({
	getUserInfo,
	validateEmail,
	requestEmailVerificationCode,
}: VerifyAccountCodePageProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();

	async function handleOnSubmit(verificationCode: string) {
		setIsSubmitting(true);

		try {
			setErrorMessage('');

			await validateEmail.run(verificationCode, userEmail);

			router.push({
				pathname: '/success',
				params: {
					title: 'Cadastro concluído com sucesso',
					subtitle:
						'Você está quase lá, agora só falta escolher o plano que mais combina com você.',
					buttonText: 'Escolher meu plano',
					onPressDestination: '/select-plan',
				},
			});
		} catch (error) {
			handleError(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleRequestVerificationCode(email: string) {
		try {
			await requestEmailVerificationCode.run(email);
		} catch (error) {
			handleError(error);
		}
	}

	async function initialize() {
		setIsLoading(true);

		try {
			const user = await getUserInfo.run();
			setUserEmail(user!.email);
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		initialize();
	}, []);

	return (
		<VerifyCodeView
			userEmail={userEmail}
			errorMessage={errorMessage}
			isLoading={isLoading}
			isSubmitting={isSubmitting}
			onCodeSubmit={handleOnSubmit}
			onVerificationCodeRequested={handleRequestVerificationCode}
		/>
	);
}
