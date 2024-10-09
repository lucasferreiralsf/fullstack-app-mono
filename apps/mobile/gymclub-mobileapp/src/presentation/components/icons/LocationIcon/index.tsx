import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { LocationIconProps } from './types';

const {
	gymclub: { gray },
} = colors;

export default function LocationIcon({
	className,
	color = gray[500],
}: LocationIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 16 16">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8 2.667a4.667 4.667 0 00-4.667 4.667c0 1.47.891 2.845 2.137 3.925l2.294 1.988a.36.36 0 00.472 0l2.294-1.988c1.246-1.08 2.137-2.455 2.137-3.926A4.667 4.667 0 008 2.667zM2 7.334a6 6 0 1112 0c0 2.017-1.207 3.727-2.597 4.932L9.11 14.255a1.693 1.693 0 01-2.218 0l-2.294-1.989C3.207 11.061 2 9.351 2 7.333z"
					fill={color}
				/>
				<Path
					d="M9.333 7.333a1.333 1.333 0 11-2.666 0 1.333 1.333 0 012.666 0z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
