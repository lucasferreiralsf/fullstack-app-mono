import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Button from '@/presentation/components/Button';
import TermsAndPrivacy from '@/presentation/components/TermsAndPrivacy';
import Text from '@/presentation/components/Text';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';

import CodeResendCountdown from '../CodeResendCountdown';
import VerifyCodeHeader from '../VerifyCodeHeader';
import VerifyCodeInput from '../VerifyCodeInput';
import { VerifyCodeInputRef, VerifyCodeViewProps } from './types';

export default function VerifyCodeView({
	userEmail,
	errorMessage,
	onCodeSubmit,
	onVerificationCodeRequested,
	isLoading,
	isSubmitting,
}: VerifyCodeViewProps) {
	const [isCodeComplete, setIsCodeComplete] = useState(false);
	const verifyCodeInputRef = useRef<VerifyCodeInputRef>(null);
	const [code, setCode] = useState('');

	function resendCode() {
		onVerificationCodeRequested(userEmail);
	}

	return (
		<ScrollView
			className="gap-6"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1, padding: 21 }}
		>
			<VerifyCodeHeader userEmail={userEmail} />

			<VerifyCodeInput
				ref={verifyCodeInputRef}
				errorMessage={errorMessage}
				onChange={(c) => void setCode(c)}
				onCodeComplete={setIsCodeComplete}
			/>

			<CodeResendCountdown sendCode={() => void resendCode()} />

			<View className="flex-1" />

			<TermsAndPrivacy />

			<Button
				className="mt-6"
				disabled={isLoading || !isCodeComplete}
				onPress={() => void onCodeSubmit(code)}
			>
				{isSubmitting ? (
					<ThreeDotsLoading />
				) : (
					<Text className="text-gymclub-white font-gymclub-semi-bold">
						Avançar
					</Text>
				)}
			</Button>
		</ScrollView>
	);
}
