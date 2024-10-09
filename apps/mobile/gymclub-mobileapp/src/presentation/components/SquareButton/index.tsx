import { TouchableOpacity, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { SquareButtonProps } from './types';

export default function SquareButton(props: SquareButtonProps) {
	const { title, icon, onPress } = props;

	const iconElement = () => icon && <View className="flex-1">{icon}</View>;

	return (
		<TouchableOpacity
			onPress={onPress}
			className="aspect-square p-2 bg-gymclub-primary rounded-[1.5rem] max-w-32 flex-1 flex-col items-center justify-center gap-2"
		>
			{iconElement()}

			<Text className="text-gymclub-white flex-1 font-gymclub-semi-bold whitespace-nowrap text-center px-1">
				{title}
			</Text>
		</TouchableOpacity>
	);
}
