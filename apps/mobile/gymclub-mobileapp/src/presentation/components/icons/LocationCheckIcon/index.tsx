import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { LocationCheckIconProps } from './types';

const {
	gymclub: { white },
} = colors;

export default function LocationCheckIcon({
	color = white,
	className,
}: LocationCheckIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 25 24">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.207 16.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414l1.293 1.293 3.293-3.293a1 1 0 011.414 0z"
					fill={color}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.5 11a9 9 0 0118 0c0 1.22-.297 2.37-.785 3.421a1 1 0 01-1.814-.842c.384-.825.599-1.688.599-2.579a7 7 0 10-14 0c0 2.206 1.335 4.267 3.205 5.888l3.441 2.982a.537.537 0 00.354.132 1 1 0 110 2 2.537 2.537 0 01-1.664-.62l-3.441-2.983C5.31 16.591 3.5 14.026 3.5 11z"
					fill={color}
				/>
				<Path d="M14.5 11a2 2 0 11-4 0 2 2 0 014 0z" fill={color} />
			</Svg>
		</View>
	);
}
