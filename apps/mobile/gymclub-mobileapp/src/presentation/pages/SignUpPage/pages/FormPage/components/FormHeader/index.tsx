import { View } from 'react-native';

import { GreenCheckIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';
import SignUpHeader from '@/presentation/pages/SignUpPage/components/SignUpHeader';

export default function FormHeader() {
	return (
		<>
			<SignUpHeader />

			<View className="flex-row gap-2">
				<GreenCheckIcon className="h-7 w-7" />

				<Text className="mb-2 text-gymclub-black font-gymclub-extra-bold text-lg">
					Pronto!{' '}
					<Text className="mb-2 text-gymclub-black font-gymclub-medium text-lg">
						Agora cria tua conta
					</Text>
				</Text>
			</View>

			<Text className="mb-6 text-gymclub-gray-500 font-gymclub-regular text-base">
				Preenche os campos abaixo para criar tua conta para acessar o app{' '}
				<Text className="text-gymclub-primary font-gymclub-bold text-base">
					gymclub
				</Text>
				.
			</Text>
		</>
	);
}
