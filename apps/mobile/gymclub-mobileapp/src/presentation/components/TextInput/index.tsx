import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';

import Text from '@/presentation/components/Text';
import { colors } from '@/presentation/styles/colors';

import { TextInputProps } from './types';

const {
	gymclub: { gray },
} = colors;

export default function TextInput({
	onChangeText,
	icon,
	value,
	label,
	className,
	...inputProps
}: TextInputProps) {
	const [inputValue, setInputValue] = useState(value || '');
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (value !== inputValue) {
			setInputValue(value);
		}
	}, [value]);

	const inputClasses = useMemo(() => {
		const baseClasses =
			'rounded-xl p-4 font-gymclub-regular text-gymclub-black';
		const focusedClasses = 'border-1.5 border-gymclub-gray-400';
		const unfocusedClasses = 'border border-gymclub-gray-300';

		return `${baseClasses} ${isFocused ? focusedClasses : unfocusedClasses}`;
	}, [isFocused]);

	const handleInputChange = useCallback(
		(newValue: string) => {
			setInputValue(newValue);
			onChangeText(newValue);
		},
		[onChangeText],
	);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
	}, []);

	return (
		<View className={className}>
			{label && (
				<Text className="mb-2 text-gymclub-black font-gymclub-semi-bold">
					{label}
				</Text>
			)}
			<View className="relative">
				<NativeTextInput
					className={inputClasses}
					onChangeText={handleInputChange}
					value={inputValue}
					onFocus={handleFocus}
					onBlur={handleBlur}
					selectionColor={gray[500]}
					{...inputProps}
				/>
				{icon && (
					<View className="absolute right-4 top-1/2 transform -translate-y-1/2">
						{icon}
					</View>
				)}
			</View>
		</View>
	);
}
