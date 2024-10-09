import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { CircleXIconProps } from './types';

const {
	gymclub: { gray },
} = colors;

export default function CircleXIcon({
	color = gray[300],
	className,
}: CircleXIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 24 25">
				<Path
					d="M11.999 2.453c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2a8 8 0 110 16 8 8 0 010-16zm-3 4c-.256 0-.523.086-.72.281a1.03 1.03 0 000 1.438l2.282 2.281-2.281 2.281a1.03 1.03 0 000 1.438 1.03 1.03 0 001.438 0l2.28-2.28 2.282 2.28a1.03 1.03 0 001.438 0 1.03 1.03 0 000-1.438l-2.281-2.28 2.28-2.282a1.03 1.03 0 000-1.438 1.014 1.014 0 00-.718-.28c-.256 0-.523.085-.72.28L12 11.015l-2.281-2.28a1.014 1.014 0 00-.72-.282z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
