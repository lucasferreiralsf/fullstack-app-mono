import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { OpenedEyeIconProps } from './types';

const {
	gymclub: { gray },
} = colors;

export default function OpenedEyeIcon({
	className,
	color = gray[300],
}: OpenedEyeIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 24 24">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 6c-4.855 0-7.11 3.773-7.903 5.553a1.088 1.088 0 000 .894C4.89 14.227 7.145 18 12 18c4.855 0 7.11-3.773 7.903-5.553a1.089 1.089 0 000-.893C19.11 9.772 16.856 6 12 6zm-9.73 4.74C3.14 8.788 5.891 4 12 4c6.11 0 8.861 4.788 9.73 6.74a3.088 3.088 0 010 2.52C20.861 15.212 18.11 20 12 20c-6.109 0-8.86-4.788-9.73-6.74a3.088 3.088 0 010-2.52z"
					fill={color}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 8a4 4 0 100 8 4 4 0 000-8zm-.085 2.002L12 10a2 2 0 11-1.998 1.915A1.5 1.5 0 0012 10.5a1.5 1.5 0 00-.085-.498z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
