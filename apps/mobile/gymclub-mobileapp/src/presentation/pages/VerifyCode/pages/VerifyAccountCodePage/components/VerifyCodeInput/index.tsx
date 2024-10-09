import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import { TextInput, View } from 'react-native';

import Text from '@/presentation/components/Text';
import { colors } from '@/presentation/styles/colors';

import { VerifyCodeInputProps } from './types';

const {
	gymclub: { gray },
} = colors;

const VerifyCodeInput = forwardRef(
	({ onSubmit, onCodeComplete, errorMessage }: VerifyCodeInputProps, ref) => {
		const [code, setCode] = useState(['', '', '', '', '']);
		const inputs = useRef<(TextInput | null)[]>([]);

		useImperativeHandle(ref, () => ({
			submitCode: () => {
				onSubmit(code.join(''));
			},
		}));

		const handleChangeText = (text: string, index: number) => {
			if (text.length === 5) {
				const newCode = [...text.slice(0, 5)];
				setCode(newCode);

				newCode.forEach((digit, i) => {
					if (inputs.current[i]) {
						inputs.current[i]?.setNativeProps({ text: digit });
					}
				});

				inputs.current[4]?.focus();

				onSubmit(text);
			} else {
				const newCode = [...code];
				newCode[index] = text.slice(0, 1);
				setCode(newCode);

				if (text && index < 4) {
					inputs.current[index + 1]?.focus();
				}
			}
		};

		const handleKeyPress = (key: string, index: number) => {
			if (key === 'Backspace' && index > 0 && !code[index]) {
				inputs.current[index - 1]?.focus();
			}
		};

		useEffect(() => {
			const isComplete = code.every((digit) => digit !== '');
			onCodeComplete(isComplete);
		}, [code, onCodeComplete]);

		return (
			<View className="pt-6">
				<View className="flex-row gap-4 mb-3">
					{code.map((digit, index) => (
						<TextInput
							key={index}
							selectionColor={gray[400]}
							className="border border-gymclub-gray-300 w-14 h-16 rounded-xl text-center text-gymclub-black font-gymclub-extra-bold text-4xl leading-snug"
							keyboardType="numeric"
							ref={(input) => {
								inputs.current[index] = input;
							}}
							value={digit}
							onChangeText={(text) => void handleChangeText(text, index)}
							onKeyPress={({ nativeEvent: { key } }) =>
								void handleKeyPress(key, index)
							}
						/>
					))}
				</View>

				{errorMessage && (
					<Text className="text-red-400 mb-2 font-gymclub-bold">
						{errorMessage}
					</Text>
				)}
			</View>
		);
	},
);

export default VerifyCodeInput;
