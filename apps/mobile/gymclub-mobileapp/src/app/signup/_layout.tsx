import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import { SignUpProvider } from '@/presentation/pages/SignUpPage/store';

export default function SignUpLayout() {
	return (
		<SignUpProvider>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 bg-gymclub-white"
			>
				<SafeAreaView className="flex-1">
					<Stack>
						<Stack.Screen
							name="company-select/index"
							options={{
								headerShown: false,
								gestureEnabled: false,
								contentStyle: {
									backgroundColor: 'transparent',
								},
							}}
						/>
						<Stack.Screen
							name="form/index"
							options={{
								headerShown: false,
								gestureEnabled: false,
								contentStyle: {
									backgroundColor: 'transparent',
								},
							}}
						/>
						<Stack.Screen
							name="verify-account-code/index"
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
		</SignUpProvider>
	);
}
