import { TouchableOpacity, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { CategoryPillProps } from './types';

export default function CategoryPill({
	className,
	label,
	selected,
	onPress,
}: CategoryPillProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				className={`mr-3 rounded-xl px-3 py-2 ${selected ? 'border border-gymclub-rose-200 bg-gymclub-rose-100' : 'bg-gymclub-gray-100'} ${className}`}
			>
				<Text
					className={`${selected ? 'text-gymclub-black' : 'text-gymclub-gray-600'} font-gymclub-regular`}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
