import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { CodeResendCountdownProps } from './types';

export default function CodeResendCountdown({
	sendCode,
}: CodeResendCountdownProps) {
	const [seconds, setSeconds] = useState(60);
	const [canResend, setCanResend] = useState(false);
	const [codeResent, setCodeResent] = useState(false);

	useEffect(() => {
		let timer: Timer | undefined;

		if (seconds > 0 && !codeResent) {
			timer = setTimeout(() => void setSeconds(seconds - 1), 1000);
		} else {
			setCanResend(true);
		}

		return () => void clearTimeout(timer);
	}, [seconds, codeResent]);

	const handleResendCode = () => {
		setCodeResent(true);
		setCanResend(false);
		sendCode();
	};

	if (codeResent)
		return (
			<View className="mt-3">
				<Text className="text-gymclub-gray-500 font-gymclub-regular">
					Código reenviado.
				</Text>
			</View>
		);

	return (
		<View className="mt-3">
			{canResend ? (
				<TouchableOpacity onPress={handleResendCode}>
					<Text className="text-gymclub-blue-600 font-gymclub-semi-bold">
						Envie um novo código
					</Text>
				</TouchableOpacity>
			) : (
				<Text className="text-gymclub-gray-500 font-gymclub-regular">
					Você pode pedir um novo código em{' '}
					<Text className="text-gymclub-black font-gymclub-bold">
						{seconds}s
					</Text>
				</Text>
			)}
		</View>
	);
}
