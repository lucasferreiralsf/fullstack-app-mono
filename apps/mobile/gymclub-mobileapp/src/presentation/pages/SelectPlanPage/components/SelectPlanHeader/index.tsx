import { View } from 'react-native';

import GymClubLogo from '@/presentation/components/icons/GymClubLogo';
import Text from '@/presentation/components/Text';
import { colors } from '@/presentation/styles/colors';

const {
	gymclub: { primary, black },
} = colors;

export default function SelectPlanHeader() {
	return (
		<View className="px-6 mb-12">
			<GymClubLogo className="h-28 w-32 self-center" color={black} />
			<View>
				<View className="flex-row items-center gap-1">
					<Text className="font-gymclub-regular text-gymclub-black">
						Bem-vindo ao
					</Text>
					<GymClubLogo className="h-8 w-18 self-center" color={primary} />
				</View>
				<Text className="font-gymclub-regular text-gymclub-black">
					Escolha o melhor plano para você.
				</Text>
			</View>
		</View>
	);
}
