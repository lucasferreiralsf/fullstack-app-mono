import { View } from 'react-native';

import { HelloHandIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';

export default function WelcomeHeader() {
	return (
		<View className="flex-row items-center gap-1">
			<Text className="text-gymclub-black font-gymclub-extra-bold text-2xl">
				Bem-vindo(a)
			</Text>
			<HelloHandIcon className="h-7 w-7" />
		</View>
	);
}
