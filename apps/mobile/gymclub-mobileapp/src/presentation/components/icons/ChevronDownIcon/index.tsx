import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { ChevronDownIconProps } from './types';

const {
	gymclub: { black },
} = colors;

export default function ChevronDownIcon({
	color = black,
	className,
}: ChevronDownIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 25 24">
				<Path
					d="M2.985 7.498a1.25 1.25 0 000 1.77l8.31 8.31c.39.39 1.02.39 1.41 0l8.31-8.31c.49-.49.49-1.28 0-1.77a1.25 1.25 0 00-1.77 0l-7.25 7.24-7.25-7.25c-.48-.48-1.28-.48-1.76.01z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
