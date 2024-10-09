import { router } from 'expo-router';
import { View } from 'react-native';

import LeftTextHeader from '@/presentation/components/LeftTextHeader';
import Text from '@/presentation/components/Text';

import { PaymentHeaderProps } from './types';

export default function PaymentHeader({ backUrl }: PaymentHeaderProps) {
	function handleBackPress() {
		if (backUrl) {
			router.navigate(backUrl);
		} else {
			router.back();
		}
	}

	return (
		<View>
			<LeftTextHeader
				title="Método de pagamento"
				// TODO: need to be updated, user can come from splash and plans page
				onPress={handleBackPress}
			/>

			<Text className="text-gymclub-black font-gymclub-medium text-lg">
				Selecione o método de pagamento para concluir a adesão ao{' '}
				<Text className="text-gymclub-black font-gymclub-bold text-lg">
					GymClub
				</Text>
			</Text>
		</View>
	);
}
