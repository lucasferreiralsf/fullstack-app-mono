import { TextInputProps as RNTextInputProps } from 'react-native';

import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface TextInputProps extends RNTextInputProps, PropsWithClassName {
	icon?: JSX.Element;
	label?: string;
	onChangeText: (text: string) => void;
	value: string;
}
