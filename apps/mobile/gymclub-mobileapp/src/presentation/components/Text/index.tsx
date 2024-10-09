import { Text as DefaultText, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
	className?: string;
}

export default function Text({
	className = '',
	style,
	...props
}: CustomTextProps) {
	return (
		<DefaultText
			className={`${className} tracking-tight text-gymclub-black`}
			style={style}
			{...props}
		/>
	);
}
