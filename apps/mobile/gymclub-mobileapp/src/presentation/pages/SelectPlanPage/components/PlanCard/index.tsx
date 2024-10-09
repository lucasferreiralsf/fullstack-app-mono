import { View } from 'react-native';

import { PlanSku } from '@/domain/models/enums/plan-sku';

import Button from '@/presentation/components/Button';
import PlanIcon from '@/presentation/components/PlanIcon';
import Text from '@/presentation/components/Text';

import { PlanCardProps } from './types';

export default function PlanCard({ plan, onPress, index }: PlanCardProps) {
	return (
		<View
			className={`${index === 0 && 'ml-6'} mr-6 w-72 p-6 rounded-2xl border border-gymclub-gray-200 gap-4`}
		>
			<PlanIcon className="w-16" planSku={plan.sku} />

			<View className="flex-row gap-3">
				<Text className="text-gymclub-black font-gymclub-bold text-2xl">
					{plan.name}
				</Text>
				{plan.sku === PlanSku.GOLD && (
					<View className="rounded px-1 justify-center border border-gymclub-blue-200 bg-gymclub-blue-100">
						<Text className="text-gymclub-blue-500 text-sm font-gymclub-bold">
							MAIS POPULAR
						</Text>
					</View>
				)}
			</View>

			<Text className="font-gymclub-regular text-gymclub-gray-500">
				{plan.description}
			</Text>

			<View className="flex-row items-end">
				<Text className="text-gymclub-black font-gymclub-medium text-3xl">
					{plan.price}€
				</Text>
				<Text className="font-gymclub-regular text-gymclub-gray-500 pb-1">
					/por mês
				</Text>
			</View>
			<Button onPress={() => void onPress(plan)}>
				<Text className="text-gymclub-white font-gymclub-semi-bold">
					Escolher esse
				</Text>
			</Button>
		</View>
	);
}
