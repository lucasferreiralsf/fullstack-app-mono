import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import 'react-native-reanimated';

import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	Manrope_800ExtraBold,
	useFonts,
} from '@expo-google-fonts/manrope';

import '@/presentation/styles/global.css';

import { Loading } from '@/presentation/components/Loading';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: 'index' };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
		Manrope_800ExtraBold,
		...FontAwesome.font,
	});

	useEffect(() => {
		if (fontError) throw fontError;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded) return <Loading />;

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="signin/index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="signup"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="forgot-my-password"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="home"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="success/index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="select-plan/index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="payment-page/index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="see-all-gyms/[listType]"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name="checkin-history/index"
				options={{ headerShown: false, gestureEnabled: false }}
			/>
		</Stack>
	);
}
