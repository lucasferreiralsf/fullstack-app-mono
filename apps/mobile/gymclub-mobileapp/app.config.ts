import 'dotenv/config';

export default {
	expo: {
		name: 'gymclub-mobileapp',
		slug: 'gymclub-mobileapp',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './public/assets/images/icon.png',
		scheme: 'gymclub',
		userInterfaceStyle: 'automatic',
		extra: {
			AUTH_API_URL: process.env.AUTH_API_URL,
			PAYMENT_PROVIDER_PUBLIC_KEY: process.env.PAYMENT_PROVIDER_PUBLIC_KEY,
		},
		splash: {
			image: './public/assets/images/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		ios: {
			supportsTablet: true,
			infoPlist: {
				NSLocationWhenInUseUsageDescription:
					'This app uses the location to filter the gyms near the user and to check in to the gym.',
			},
			bundleIdentifier: 'com.anonymous.gymclub-mobileapp',
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './public/assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
			package: 'com.anonymous.gymclubmobileapp',
		},
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './public/assets/images/favicon.png',
		},
		plugins: [
			'expo-router',
			'expo-font',
			'expo-secure-store',
			[
				'expo-build-properties',
				{
					android: {
						compileSdkVersion: 34,
						targetSdkVersion: 34,
						buildToolsVersion: '34.0.0',
					},
				},
			],
		],
		experiments: {
			typedRoutes: true,
			tsconfigPaths: true,
		},
	},
};
