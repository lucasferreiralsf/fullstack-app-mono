import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { StarIconProps } from './types';

export default function StartIcon({ className, color }: StarIconProps) {
	return (
		<View className={`${className} aspect-square`}>
			<Svg height="100%" width="100%" viewBox="0 0 12 11">
				<Path
					fill={color}
					d="M5.99999 9.17976L8.76665 10.8531C9.27332 11.1598 9.89332 10.7064 9.75999 10.1331L9.02666 6.98643L11.4733 4.86643C11.92 4.47976 11.68 3.74643 11.0933 3.69976L7.87332 3.42643L6.61332 0.453096C6.38665 -0.0869043 5.61332 -0.0869043 5.38665 0.453096L4.12665 3.41976L0.906654 3.6931C0.319987 3.73976 0.0799873 4.4731 0.526654 4.85976L2.97332 6.97976L2.23999 10.1264C2.10665 10.6998 2.72665 11.1531 3.23332 10.8464L5.99999 9.17976Z"
				/>
			</Svg>
		</View>
	);
}
