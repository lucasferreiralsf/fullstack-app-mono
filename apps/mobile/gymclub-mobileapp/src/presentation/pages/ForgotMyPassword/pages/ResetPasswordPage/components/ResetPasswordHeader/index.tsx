import { router } from 'expo-router';
import { View } from 'react-native';

import { GreenCheckIcon } from '@/presentation/components/icons';
import LeftTextHeader from '@/presentation/components/LeftTextHeader';
import Text from '@/presentation/components/Text';

export default function ResetPasswordHeader() {
	return (
		<>
			<LeftTextHeader
				title="Esqueci minha senha"
				onPress={() => void router.back()}
			/>

			<View className="flex-row gap-2">
				<GreenCheckIcon className="h-7 w-7" />

				<Text className="mb-2 text-gymclub-black font-gymclub-extra-bold text-lg">
					Pronto!{' '}
					<Text className="mb-2 text-gymclub-black font-gymclub-medium text-lg">
						Agora cria tua nova senha
					</Text>
				</Text>
			</View>

			<Text className="mb-6 text-gymclub-gray-500 font-gymclub-regular text-base">
				Preenche os campos abaixo com uma nova senha.
			</Text>
		</>
	);
}
