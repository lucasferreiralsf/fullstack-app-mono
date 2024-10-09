import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface SelectProps extends PropsWithClassName {
	values: SelectOption[];
	onValueChange: (value: SelectOption) => void;
	leftIcon?: React.ReactNode;
	defaultValue: SelectOption;
}

export interface SelectOption {
	key: string;
	value: string;
}
