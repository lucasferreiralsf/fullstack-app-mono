import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { PlanCard } from '../PlanCard';
import { PlanDetailsProps } from './types';

export function PlanDetails({ plan }: PlanDetailsProps) {
	return (
		<View className="gap-3">
			<View className="flex-row justify-between">
				<Text className="text-lg text-gymclub-black font-gymclub-semi-bold">
					Plano selecionado
				</Text>
				<TouchableOpacity onPress={() => void router.navigate('/select-plan')}>
					<Text className="text-lg text-gymclub-blue-500 font-gymclub-semi-bold">
						Ver todos
					</Text>
				</TouchableOpacity>
			</View>

			<PlanCard plan={plan} />
		</View>
	);
}
