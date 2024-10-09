import {
	BottomTabBarProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { MakeCheckInPage } from '@/main/factories/pages/checkInPage';
import { MakeProfilePage } from '@/main/factories/pages/profilePage';

import GenericHeader from '@/presentation/components/GenericHeader';
import TabBar from '@/presentation/components/TabBar';
import { TabBarProps } from '@/presentation/components/TabBar/types';
import TabBarIcon from '@/presentation/components/TabBarIcon';
import { AppPage } from '@/presentation/enums/app-page';
import {
	titlePageMap,
	titleTabMap,
} from '@/presentation/helpers/content-helpers';
import SearchPage from '@/presentation/pages/SearchPage';
import { colors } from '@/presentation/styles/colors';

import HomePage from '.';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
	const {
		gymclub: { white, black },
	} = colors;

	const makeTabBarItems = (props: BottomTabBarProps): TabBarProps['items'] =>
		props.state.routes.map((route, index) => {
			const { options } = props.descriptors[route.key];
			const isFocused = props.state.index === index;

			return {
				icon: (
					<TabBarIcon
						name={route.name as AppPage}
						color={isFocused ? white : black}
					/>
				),
				title: options.title ?? '',
				key: route.key,
				active: isFocused,
			};
		});

	const onTabSelect = (key: number | string, props: BottomTabBarProps) => {
		const route = props.state.routes.find((r) => r.key === key);
		const event = props.navigation.emit({
			type: 'tabPress',
			target: key.toString(),
			canPreventDefault: true,
		});

		if (!event.defaultPrevented && route) {
			props.navigation.navigate(route.name);
		}
	};

	return (
		<Tab.Navigator
			sceneContainerStyle={{ backgroundColor: white }}
			tabBar={(props) => (
				<TabBar
					items={makeTabBarItems(props)}
					onTabSelect={(key: number | string) => {
						onTabSelect(key, props);
					}}
				/>
			)}
		>
			<Tab.Screen
				name={AppPage.HOME}
				component={HomePage}
				options={{ title: titleTabMap(AppPage.HOME), headerShown: false }}
			/>
			<Tab.Screen
				name={AppPage.CHECK_IN}
				component={MakeCheckInPage}
				options={{
					title: titleTabMap(AppPage.CHECK_IN),
					headerShown: true,
					header: () => (
						<GenericHeader title={titlePageMap(AppPage.CHECK_IN)} />
					),
				}}
			/>
			<Tab.Screen
				name={AppPage.SEARCH}
				component={SearchPage}
				options={{
					title: titleTabMap(AppPage.SEARCH),
					headerShown: true,
					header: () => <GenericHeader title={titlePageMap(AppPage.SEARCH)} />,
				}}
			/>
			<Tab.Screen
				name={AppPage.PROFILE}
				component={MakeProfilePage}
				options={{
					title: titleTabMap(AppPage.PROFILE),
					headerShown: true,
					header: () => <GenericHeader title={titlePageMap(AppPage.PROFILE)} />,
				}}
			/>
		</Tab.Navigator>
	);
}
