import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import { ForgotMyPasswordProvider } from '@/presentation/pages/ForgotMyPassword/store';

export default function ForgotMyPasswordLayout() {
	return (
		<ForgotMyPasswordProvider>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 bg-gymclub-white"
			>
				<SafeAreaView className="flex-1">
					<Stack>
						<Stack.Screen
							name="check-email/index"
							options={{
								headerShown: false,
								gestureEnabled: false,
								contentStyle: {
									backgroundColor: 'transparent',
								},
							}}
						/>
						<Stack.Screen
							name="verify-password-code/index"
							options={{
								headerShown: false,
								gestureEnabled: false,
								contentStyle: {
									backgroundColor: 'transparent',
								},
							}}
						/>
						<Stack.Screen
							name="reset-password/index"
							options={{
								headerShown: false,
								gestureEnabled: false,
								contentStyle: {
									backgroundColor: 'transparent',
								},
							}}
						/>
					</Stack>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</ForgotMyPasswordProvider>
	);
}
