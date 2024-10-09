import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { HistoryIconProps } from './types';

const {
	gymclub: { blue },
} = colors;

export default function HistoryIcon({
	className,
	color = blue[500],
}: HistoryIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 32 32">
				<Path
					d="M17.872 4.002c-6.787-.186-12.347 5.267-12.347 12H3.14c-.6 0-.894.72-.467 1.134l3.72 3.733a.66.66 0 00.947 0l3.72-3.733c.413-.414.12-1.134-.48-1.134H8.192c0-5.2 4.24-9.4 9.467-9.333 4.96.067 9.133 4.24 9.2 9.2.066 5.213-4.134 9.466-9.334 9.466a9.193 9.193 0 01-5.706-1.973 1.326 1.326 0 00-1.76.107c-.56.56-.52 1.506.106 1.986a11.81 11.81 0 007.36 2.547c6.734 0 12.187-5.56 12-12.346-.173-6.254-5.4-11.48-11.653-11.654zm-.68 6.667c-.547 0-1 .453-1 1v4.907c0 .466.253.906.653 1.146l4.16 2.467c.48.28 1.094.12 1.374-.347a1.01 1.01 0 00-.347-1.373l-3.84-2.28v-4.534c0-.533-.453-.986-1-.986z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
