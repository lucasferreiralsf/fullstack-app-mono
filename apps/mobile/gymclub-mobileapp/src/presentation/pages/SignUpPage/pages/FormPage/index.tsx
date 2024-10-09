import { router } from 'expo-router';
import { useContext, useRef, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';

import Button from '@/presentation/components/Button';
import TermsAndPrivacy from '@/presentation/components/TermsAndPrivacy';
import Text from '@/presentation/components/Text';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';
import { useErrorHandling } from '@/presentation/hooks/use-error-handling';
import { validateForm } from '@/presentation/validators/sign-up/formValidation';

import { SignUpContext } from '../../store';
import FormHeader from './components/FormHeader';
import SignUpForm from './components/SignUpForm';
import { FormPageProps, SignUpFormData, SignUpFormRef } from './types';

export default function FormPage({ signUp }: FormPageProps) {
	const { selectedCompany, userDocNumber } = useContext(SignUpContext);
	const [isLoading, setIsLoading] = useState(false);
	const formRef = useRef<SignUpFormRef>(null);

	const { errorMessage, handleError, setErrorMessage } = useErrorHandling();

	const handleFormSubmit = async (formData: SignUpFormData) => {
		setErrorMessage('');
		setIsLoading(true);

		try {
			Keyboard.dismiss();

			validateForm(formData);

			if (!selectedCompany?.tenantId || !userDocNumber) throw new Error();

			await signUp.run({
				...formData,
				tenantId: selectedCompany?.tenantId,
				docNumber: userDocNumber,
			});

			router.navigate('/signup/verify-account-code');
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
			<FormHeader />

			<SignUpForm ref={formRef} onSubmit={handleFormSubmit} />

			{errorMessage && (
				<Text className="text-red-400 mb-4 font-gymclub-bold">
					{errorMessage}
				</Text>
			)}

			<View className="flex-1" />

			<TermsAndPrivacy />

			<Button
				className="mt-6"
				disabled={isLoading}
				onPress={() => void formRef.current?.submitForm()}
			>
				{isLoading ? (
					<ThreeDotsLoading />
				) : (
					<Text className="text-gymclub-white font-gymclub-semi-bold">
						Registrar
					</Text>
				)}
			</Button>
		</ScrollView>
	);
}
