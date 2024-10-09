import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { BuildingIconProps } from './types';

const {
	gymclub: { black },
} = colors;

export default function BuildingIcon({
	color = black,
	className,
}: BuildingIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 24 25">
				<Path
					d="M6.999 3.49a1 1 0 000 2v2h-4a1 1 0 000 2v11a1 1 0 001 1h8a1 1 0 001-1v-2a1 1 0 012 0v2a1 1 0 001 1h4a1 1 0 001-1v-15a1 1 0 000-2h-14zm2 2h10v14h-2v-1a3 3 0 10-6 0v1h-2v-14zm3 2a1 1 0 100 2.001 1 1 0 000-2zm4 0a1 1 0 100 2.001 1 1 0 000-2zm-11 2h2v10h-2v-10zm7 2a1 1 0 100 2.001 1 1 0 000-2zm4 0a1 1 0 100 2.001 1 1 0 000-2z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
