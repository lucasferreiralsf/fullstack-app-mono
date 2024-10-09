import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { SearchIconProps } from './types';

const {
	gymclub: { white },
} = colors;

export default function SearchIcon({
	color = white,
	className,
}: SearchIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 25 24">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14.293 13.793a1 1 0 011.414 0l5.5 5.5a1 1 0 01-1.414 1.414l-5.5-5.5a1 1 0 010-1.414z"
					fill={color}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.5 5a5 5 0 100 10 5 5 0 000-10zm-7 5a7 7 0 1114 0 7 7 0 01-14 0z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
