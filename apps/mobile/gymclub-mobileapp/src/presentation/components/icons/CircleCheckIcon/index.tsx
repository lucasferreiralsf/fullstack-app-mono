import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { CircleCheckIconProps } from './types';

const {
	gymclub: { gray },
} = colors;

export default function CircleCheckIcon({
	className,
	color = gray[500],
}: CircleCheckIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 16 17">
				<Path
					d="M8.01 1.833a6.667 6.667 0 100 13.333 6.674 6.674 0 006.625-5.875.677.677 0 00-.584-.75.675.675 0 00-.75.583 5.34 5.34 0 01-5.292 4.708 5.334 5.334 0 010-10.666c.616 0 1.225.111 1.792.313.347.122.71-.07.834-.417a.666.666 0 00-.396-.855 6.665 6.665 0 00-2.23-.374zm6 1.333c-.171 0-.35.06-.48.187l-5.813 5.73c-.17.168-.344.136-.478-.063l-.667-.98a.691.691 0 00-.937-.187.66.66 0 00-.188.917l.666.98c.601.885 1.776 1.002 2.542.25L14.49 4.29a.661.661 0 000-.938.684.684 0 00-.48-.187z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
