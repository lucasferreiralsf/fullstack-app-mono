import { router } from 'expo-router';
import { useContext, useMemo, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';

import Button from '@/presentation/components/Button';
import TermsAndPrivacy from '@/presentation/components/TermsAndPrivacy';
import Text from '@/presentation/components/Text';
import { ThreeDotsLoading } from '@/presentation/components/ThreeDotsLoading';

import { SignUpContext } from '../../store';
import CompanySelectHeader from './components/CompanySelectHeader';
import CompanySelector from './components/CompanySelector';
import DocNumberInput from './components/DocNumberInput';
import { CompanySelectPageProps } from './types';

export default function CompanySelectPage({
	getCompanies,
	validateUserDocument,
}: CompanySelectPageProps) {
	const { selectedCompany, setUserDocNumber } = useContext(SignUpContext);
	const [docNumber, setDocNumber] = useState('');
	const [documentCheckError, setDocumentCheckError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const disableRegisterButton = useMemo(
		() => docNumber.length < 9 || isLoading,
		[docNumber, isLoading],
	);

	const handleProceed = async () => {
		setIsLoading(true);
		setDocumentCheckError(false);

		if (docNumber.length === 0 || !selectedCompany?.tenantId) return;

		try {
			Keyboard.dismiss();

			setUserDocNumber(docNumber);
			await validateUserDocument.run(docNumber, selectedCompany?.tenantId);

			router.navigate('/signup/form');
		} catch {
			setDocumentCheckError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1, padding: 21 }}
		>
			<CompanySelectHeader />
			<CompanySelector getCompanies={getCompanies} />

			{selectedCompany && (
				<>
					<DocNumberInput
						docNumber={docNumber}
						setDocNumber={setDocNumber}
						hasError={documentCheckError}
					/>

					<View className="flex-1" />

					<TermsAndPrivacy />

					<Button
						className="mt-6"
						disabled={disableRegisterButton}
						onPress={() => void handleProceed()}
					>
						{isLoading ? (
							<ThreeDotsLoading />
						) : (
							<Text className="text-gymclub-white font-gymclub-semi-bold">
								Avançar
							</Text>
						)}
					</Button>
				</>
			)}
		</ScrollView>
	);
}
