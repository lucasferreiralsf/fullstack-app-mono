import { View } from 'react-native';

import Text from '@/presentation/components/Text';

import { PaymentMethod } from '../PaymentMethod';
import { PaymentDataProps } from './types';

export function PaymentData({ planPrice }: PaymentDataProps) {
	return (
		<View className="gap-3">
			<Text className="text-lg text-gymclub-black font-gymclub-semi-bold">
				Dados do pagamento
			</Text>

			<View className="gap-5">
				<PaymentMethod
					method="MbWay"
					details={{ phoneNumber: '+351 937 824 134', amount: planPrice }}
				/>

				<View className="flex-row items-center justify-center">
					<View className="flex-1 border-t border-gymclub-gray-200" />
					<Text className="mx-4 text-lg text-gymclub-gray-400">ou</Text>
					<View className="flex-1 border-t border-gymclub-gray-200" />
				</View>

				<PaymentMethod
					method="Multibanco"
					details={{
						entity: '12345',
						reference: '789 879 875',
						amount: planPrice,
					}}
				/>
			</View>
		</View>
	);
}
