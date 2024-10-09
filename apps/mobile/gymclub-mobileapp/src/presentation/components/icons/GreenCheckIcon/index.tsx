import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { GreenCheckIconProps } from './types';

export default function GreenCheckIcon({ className }: GreenCheckIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 24 24">
				<Path
					d="M12.014 1.999c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm4 7c.256 0 .523.086.72.281a1.03 1.03 0 010 1.438l-3.75 3.719c-1.152 1.15-2.91.978-3.814-.376l-1-1.5a1.024 1.024 0 01.282-1.406 1.024 1.024 0 011.406.282l1 1.5c.202.303.461.351.718.093l3.72-3.75c.195-.195.462-.281.718-.281z"
					fill="#00BA34"
				/>
			</Svg>
		</View>
	);
}
