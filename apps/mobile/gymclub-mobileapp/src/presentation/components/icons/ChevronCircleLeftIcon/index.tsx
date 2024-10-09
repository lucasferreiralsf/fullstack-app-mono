import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { ChevronCircleLeftIconProps } from './types';

const {
	gymclub: { primary },
} = colors;

export default function ChevronCircleLeftIcon({
	color = primary,
	className,
}: ChevronCircleLeftIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 32 32">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M16 5.333C10.109 5.333 5.333 10.11 5.333 16c0 5.89 4.776 10.666 10.667 10.666S26.667 21.892 26.667 16 21.89 5.333 16 5.333zM2.667 16C2.667 8.636 8.637 2.666 16 2.666c7.364 0 13.333 5.97 13.333 13.334S23.363 29.333 16 29.333c-7.364 0-13.333-5.97-13.333-13.333z"
					fill={color}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M18.276 11.057c.52.52.52 1.365 0 1.886L15.22 16l3.057 3.057a1.333 1.333 0 11-1.886 1.886l-4-4a1.333 1.333 0 010-1.886l4-4c.521-.52 1.365-.52 1.886 0z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
