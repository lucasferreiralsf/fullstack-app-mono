import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import Button from '@/presentation/components/Button';
import { GreenCheckIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';

import { SuccessScreenRouteProp } from './types';

export default function SuccessPage() {
	const route = useRoute<SuccessScreenRouteProp>();
	const { title, subtitle, buttonText, onPressDestination } = route.params;

	return (
		<SafeAreaView className="flex-1 bg-gymclub-white">
			<View className="flex-1 px-6 items-center justify-center">
				<View className="flex-1 justify-center">
					<GreenCheckIcon className="h-14 w-14" />

					<Text className="text-gymclub-black text-2xl font-gymclub-extra-bold mt-6 mb-4">
						Pronto!{' '}
						<Text className="text-gymclub-black font-gymclub-medium">
							{title}
						</Text>
					</Text>

					<Text className="text-gymclub-gray-500 font-gymclub-medium">
						{subtitle}
					</Text>
				</View>

				<Button
					className="mt-6 w-full"
					onPress={() => {
						router.push(onPressDestination);
					}}
				>
					<Text className="text-gymclub-white font-gymclub-semi-bold">
						{buttonText}
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
