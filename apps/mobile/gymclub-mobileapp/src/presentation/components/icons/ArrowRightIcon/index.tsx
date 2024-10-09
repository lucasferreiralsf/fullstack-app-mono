import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { colors } from '@/presentation/styles/colors';

import { ArrowRightIconProps } from './types';

const {
	gymclub: { blue },
} = colors;

export default function ArrowRightIcon({
	className,
	color = blue[600],
}: ArrowRightIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 8 8">
				<Path
					d="M0 4c0-.409.298-.74.666-.74h5.037L3.725 1.04 4.662 0l3.143 3.468c.13.145.195.339.195.533a.794.794 0 01-.195.53L4.662 8l-.937-1.04 1.978-2.22H.666C.298 4.74 0 4.409 0 4z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}
