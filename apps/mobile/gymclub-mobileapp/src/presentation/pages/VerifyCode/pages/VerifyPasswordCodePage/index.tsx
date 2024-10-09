import { router } from 'expo-router';
import { useContext, useState } from 'react';

import { useErrorHandling } from '@/presentation/hooks/use-error-handling';

import { ForgotMyPasswordContext } from '../../../ForgotMyPassword/store';
import VerifyCodeView from '../../components/VerifyCodeView';
import { VerifyPasswordCodePageProps } from './types';

export default function VerifyPasswordCodePage({
	validatePasswordResetToken,
	requestPasswordResetToken,
}: VerifyPasswordCodePageProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();

	const { userEmail, setVerificationCode } = useContext(
		ForgotMyPasswordContext,
	);

	async function handleOnSubmit(verificationCode: string) {
		setIsSubmitting(true);

		try {
			setErrorMessage('');

			await validatePasswordResetToken.run(verificationCode, userEmail);

			setVerificationCode(verificationCode);

			router.push('/forgot-my-password/reset-password');
		} catch (error) {
			handleError(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleRequestVerificationCode(email: string) {
		try {
			await requestPasswordResetToken.run(email);
		} catch (error) {
			handleError(error);
		}
	}

	return (
		<VerifyCodeView
			userEmail={userEmail}
			errorMessage={errorMessage}
			isLoading={false}
			isSubmitting={isSubmitting}
			onCodeSubmit={handleOnSubmit}
			onVerificationCodeRequested={handleRequestVerificationCode}
		/>
	);
}
