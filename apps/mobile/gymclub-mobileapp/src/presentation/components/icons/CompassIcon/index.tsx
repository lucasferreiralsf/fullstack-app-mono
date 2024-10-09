import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { CompassIconProps } from './types';

const {
	gymclub: { white },
} = colors;

export default function CompassIcon({
	color = white,
	className,
}: CompassIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 25 24">
				<Path
					d="M12.514 1.999c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2a8 8 0 110 16 8 8 0 010-16zm3.688 3.062l-6 2a.981.981 0 00-.626.626l-2 6a.984.984 0 001.25 1.25l6-2a.981.981 0 00.626-.626l2-6a.984.984 0 00-1.25-1.25zm-1.25 2.5l-1.219 3.657-3.657 1.219 1.22-3.657 3.656-1.219z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
