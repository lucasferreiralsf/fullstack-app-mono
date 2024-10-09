import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ClosedEyeIcon, OpenedEyeIcon } from '@/presentation/components/icons';
import TextInput from '@/presentation/components/TextInput';

import PasswordCriteriaItem from '../../pages/SignUpPage/pages/FormPage/components/PasswordCriteriaItem';
import { PasswordFieldsProps } from './types';

export default function PasswordFields({
	password,
	confirmPassword,
	onPasswordChange,
	onConfirmPasswordChange,
}: PasswordFieldsProps) {
	const [hidePassword, setHidePassword] = useState(true);
	const [criteria, setCriteria] = useState({
		minLength: false,
		number: false,
		uppercase: false,
		lowercase: false,
		specialChar: false,
		passwordsMatch: false,
	});

	const validatePasswordCriteria = (
		newPassword: string,
		newConfirmPassword: string,
	) => {
		const result = {
			minLength: newPassword.length >= 8,
			number: /\d/.test(newPassword),
			uppercase: /[A-Z]/.test(newPassword),
			lowercase: /[a-z]/.test(newPassword),
			specialChar: /[!"#$%&()*,.:<>?@^{|}]/.test(newPassword),
			passwordsMatch: newPassword === newConfirmPassword,
		};
		setCriteria(result);
	};

	const handlePasswordChange = (newPassword: string) => {
		onPasswordChange(newPassword);
		validatePasswordCriteria(newPassword, confirmPassword);
	};

	const handleConfirmPasswordChange = (newConfirmPassword: string) => {
		onConfirmPasswordChange(newConfirmPassword);
		validatePasswordCriteria(password, newConfirmPassword);
	};

	const passwordIcon = () => (
		<TouchableOpacity onPress={() => void setHidePassword(!hidePassword)}>
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
				label="Senha"
				placeholder="Crie uma senha"
				value={password}
				onChangeText={handlePasswordChange}
				icon={passwordIcon()}
				secureTextEntry={hidePassword}
			/>
			<TextInput
				placeholder="Confirme a senha"
				value={confirmPassword}
				onChangeText={handleConfirmPasswordChange}
				icon={passwordIcon()}
				secureTextEntry={hidePassword}
			/>

			{(password || confirmPassword) && (
				<View className="mt-2 gap-0.5">
					<Text className="text-gymclub-gray-500 font-gymclub-regular mb-1">
						Sua senha deve ter no mínimo:
					</Text>

					<PasswordCriteriaItem
						satisfied={criteria.minLength}
						label="8 caracteres"
					/>
					<PasswordCriteriaItem satisfied={criteria.number} label="Um número" />
					<PasswordCriteriaItem
						satisfied={criteria.uppercase}
						label="Uma letra maiúscula"
					/>
					<PasswordCriteriaItem
						satisfied={criteria.lowercase}
						label="Uma letra minúscula"
					/>
					<PasswordCriteriaItem
						satisfied={criteria.specialChar}
						label="Um caractere especial"
					/>
					<PasswordCriteriaItem
						satisfied={criteria.passwordsMatch}
						label="As senhas coincidem"
					/>
				</View>
			)}
		</View>
	);
}
