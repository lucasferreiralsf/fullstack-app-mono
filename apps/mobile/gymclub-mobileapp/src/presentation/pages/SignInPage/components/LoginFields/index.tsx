import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ClosedEyeIcon, OpenedEyeIcon } from '@/presentation/components/icons';
import TextInput from '@/presentation/components/TextInput';

import { LoginFieldsProps } from './types';

export default function LoginFields({
	email,
	setEmail,
	password,
	setPassword,
}: LoginFieldsProps) {
	const [hidePassword, setHidePassword] = useState(true);

	const inputIcon = () => (
		<TouchableOpacity
			onPress={() => {
				setHidePassword(!hidePassword);
			}}
		>
			{hidePassword ? (
				<OpenedEyeIcon className="h-7 w-7" />
			) : (
				<ClosedEyeIcon className="h-7 w-7" />
			)}
		</TouchableOpacity>
	);

	return (
		<View className="gap-4">
			<TextInput
				autoCapitalize="none"
				keyboardType="email-address"
				placeholder="E-mail"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Senha"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={hidePassword}
				icon={inputIcon()}
			/>
		</View>
	);
}
