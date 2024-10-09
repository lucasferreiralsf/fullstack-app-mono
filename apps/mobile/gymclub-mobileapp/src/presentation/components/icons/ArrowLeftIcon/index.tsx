import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { ArrowLeftIconProps } from './types';

const {
	gymclub: { primary },
} = colors;

export default function ArrowLeftIcon({
	className,
	color = primary,
}: ArrowLeftIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 24 25">
				<Path
					d="M20 12.5H4m0 0l6-6m-6 6l6 6"
					stroke={color}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
}
