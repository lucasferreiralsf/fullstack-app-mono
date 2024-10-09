import { View } from 'react-native';

import TabBarItem from '@/presentation/components/TabBarItem';

import { TabBarProps } from './types';

export default function TabBar(props: TabBarProps) {
	const { items, onTabSelect } = props;

	return (
		<View className="flex-row my-8 mx-6 px-6 py-3 rounded-full absolute bottom-2 left-0 right-0 bg-gymclub-rose-50/95 items-center justify-between">
			{items.map((item) => (
				<TabBarItem
					active={item.active}
					icon={item.icon}
					key={item.key}
					title={item.title}
					onPress={() => {
						onTabSelect(item.key);
					}}
				/>
			))}
		</View>
	);
}
