import { Link } from 'expo-router';
import { View } from 'react-native';

import Text from '@/presentation/components/Text';

export function RegisterLink() {
	return (
		<View className=" flex-row items-center justify-center gap-1">
			<Text className="text-gymclub-gray-500 font-gymclub-regular text-sm">
				Não é membro?
			</Text>
			<Link
				className="text-gymclub-blue-600 font-gymclub-semi-bold text-sm"
				href={'/signup/company-select'}
			>
				Registre-se agora
			</Link>
		</View>
	);
}
