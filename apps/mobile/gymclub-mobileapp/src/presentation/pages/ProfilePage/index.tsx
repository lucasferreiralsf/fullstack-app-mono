import { router } from 'expo-router';
import { View } from 'react-native';

import Button from '@/presentation/components/Button';
import Text from '@/presentation/components/Text';

import { ProfilePageProps } from './types';

export default function ProfilePage({ signOut }: ProfilePageProps) {
	const handleSignOut = async () => {
		await signOut.run();
		router.replace('/signin');
	};

	return (
		<View className="flex-1 bg-white justify-center items-center">
			<Text>Perfil</Text>
			{/* TODO: Refact when profile is ready */}
			<Button className="w-full" onPress={() => void handleSignOut()}>
				<Text className="text-gymclub-white font-gymclub-semi-bold">
					Logout
				</Text>
			</Button>
		</View>
	);
}
