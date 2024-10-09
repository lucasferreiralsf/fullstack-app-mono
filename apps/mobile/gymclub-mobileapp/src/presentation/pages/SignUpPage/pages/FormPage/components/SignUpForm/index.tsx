import { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';

import PasswordFields from '@/presentation/components/PasswordFields';
import TextInput from '@/presentation/components/TextInput';

import { SignUpFormProps } from './types';

const SignUpForm = forwardRef(({ onSubmit }: SignUpFormProps, ref) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (field: string, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			onSubmit(formData);
		},
	}));

	return (
		<View className="mb-4 gap-4">
			<TextInput
				label="Primeiro Nome"
				placeholder="Primeiro nome"
				value={formData.firstName}
				onChangeText={(value) => void handleChange('firstName', value)}
			/>
			<TextInput
				label="Último Nome"
				placeholder="Último nome"
				value={formData.lastName}
				onChangeText={(value) => void handleChange('lastName', value)}
			/>
			<TextInput
				label="Email"
				placeholder="exemplo@email.com"
				autoCapitalize="none"
				keyboardType="email-address"
				value={formData.email}
				onChangeText={(value) => void handleChange('email', value)}
			/>
			<PasswordFields
				password={formData.password}
				confirmPassword={formData.confirmPassword}
				onPasswordChange={(value) => void handleChange('password', value)}
				onConfirmPasswordChange={(value) =>
					void handleChange('confirmPassword', value)
				}
			/>
		</View>
	);
});

export default SignUpForm;
