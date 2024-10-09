import { Image, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { PaymentMethodProps } from './types';

export function PaymentMethod({ method, details }: PaymentMethodProps) {
	const logos = {
		MbWay: require('@/assets/mb-way-logo.png'),
		Multibanco: require('@/assets/multibanco-logo.png'),
	};

	return (
		<View className="bg-gymclub-dark-gray-100 rounded-xl flex-row items-start p-3 gap-3">
			<View className="w-12 h-12 bg-gymclub-white rounded-md items-center justify-center">
				<Image
					source={logos[method]}
					className="bg-center h-[26.8px] w-[22px]"
				/>
			</View>

			<View className="flex-1">
				<Text className="text-lg text-gymclub-black font-gymclub-semi-bold">
					{method}
				</Text>

				{method === 'MbWay' && (
					<View className="flex-row justify-between">
						<Text className="text-lg text-gymclub-black font-gymclub-regular">
							{details.phoneNumber}
						</Text>
						<Text className="text-lg text-gymclub-gray-500 font-gymclub-regular">
							{details.amount}€
						</Text>
					</View>
				)}

				{method === 'Multibanco' && (
					<>
						<View className="flex-row justify-between">
							<Text className="text-lg text-gymclub-black font-gymclub-regular">
								Entidade
							</Text>
							<Text className="text-lg text-gymclub-gray-500 font-gymclub-regular">
								{details.entity}
							</Text>
						</View>
						<View className="flex-row justify-between">
							<Text className="text-lg text-gymclub-black font-gymclub-regular">
								Referência
							</Text>
							<Text className="text-lg text-gymclub-gray-500 font-gymclub-regular">
								{details.reference}
							</Text>
						</View>
						<View className="flex-row justify-between">
							<Text className="text-lg text-gymclub-black font-gymclub-regular">
								Montante
							</Text>
							<Text className="text-lg text-gymclub-gray-500 font-gymclub-regular">
								{details.amount}€
							</Text>
						</View>
					</>
				)}
			</View>
		</View>
	);
}
