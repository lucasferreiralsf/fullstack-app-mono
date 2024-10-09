import { View } from 'react-native';

import { PlanSku } from '@/domain/models/enums/plan-sku';

import PlanIcon from '@/presentation/components/PlanIcon';
import Text from '@/presentation/components/Text';

import { PlanCardProps } from './types';

export function PlanCard({ plan: { name, price, sku } }: PlanCardProps) {
	return (
		<View className="border border-gymclub-gray-200 rounded-xl flex-row items-center p-3 gap-3">
			<PlanIcon className="w-10 mx-1" planSku={sku} />
			<View>
				<View className="flex-row gap-3">
					<Text className="text-lg text-gymclub-black font-gymclub-semi-bold">
						Plano {name}
					</Text>
					{sku === PlanSku.GOLD && (
						<View className="rounded px-1 justify-center border border-gymclub-blue-200 bg-gymclub-blue-100">
							<Text className="text-gymclub-blue-500 text-sm font-gymclub-bold">
								MAIS POPULAR
							</Text>
						</View>
					)}
				</View>
				<View className="flex-row items-end gap-1">
					<Text className="text-gymclub-black font-gymclub-regular">
						{price}€
					</Text>
					<Text className="font-gymclub-regular text-gymclub-gray-400 text-sm">
						/por mês
					</Text>
				</View>
			</View>
		</View>
	);
}
