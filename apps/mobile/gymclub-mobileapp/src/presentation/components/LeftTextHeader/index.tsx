import { TouchableOpacity } from 'react-native';

import Text from '@/presentation/components/Text';

import { ChevronCircleLeftIcon } from '../icons';
import { LeftTextHeaderProps } from './types';

export default function LeftTextHeader({
	title,
	onPress,
}: LeftTextHeaderProps) {
	return (
		<>
			<TouchableOpacity onPress={onPress}>
				<ChevronCircleLeftIcon className="mb-4 h-8 w-8" />
			</TouchableOpacity>

			<Text className="mb-4 text-gymclub-black font-gymclub-extra-bold text-lg">
				{title}
			</Text>
		</>
	);
}
