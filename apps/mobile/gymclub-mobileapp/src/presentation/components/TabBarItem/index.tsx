import { Text, TouchableOpacity, View } from 'react-native';

import { TabBarItemProps } from './types';

export default function TabBarItem(props: TabBarItemProps) {
	const { title, active, icon, onPress } = props;
	const iconElement = () => icon && <View>{icon}</View>;

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`py-3 px-4 rounded-full justify-center gap-1 items-center flex-row ${
				active && 'bg-gymclub-primary'
			}`}
		>
			{iconElement()}

			{active && (
				<Text className="text-gymclub-white font-gymclub-bold">{title}</Text>
			)}
		</TouchableOpacity>
	);
}
