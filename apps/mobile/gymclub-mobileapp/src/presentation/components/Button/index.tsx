import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonProps } from './types';

export default function Button({
	onPress,
	className,
	children,
	disabled = false,
}: ButtonProps) {
	const buttonClasses = useMemo(() => {
		const baseClasses = 'py-4 rounded-xl items-center justify-center';
		const enabledClasses = 'bg-gymclub-primary';
		const disabledClasses = 'bg-gymclub-rose-200';

		return `${className} ${baseClasses} ${
			disabled ? disabledClasses : enabledClasses
		}`;
	}, [className, disabled]);

	return (
		<TouchableOpacity
			className={buttonClasses}
			onPress={onPress}
			disabled={disabled}
		>
			{children}
		</TouchableOpacity>
	);
}
