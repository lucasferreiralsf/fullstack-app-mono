import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const watchKeyboardVisibility = () => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardWillShow',
			() => {
				setIsKeyboardVisible(true);
			},
		);

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardWillHide',
			() => {
				setIsKeyboardVisible(false);
			},
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	};

	useEffect(() => {
		watchKeyboardVisibility();
	}, []);

	return { isKeyboardVisible };
}
