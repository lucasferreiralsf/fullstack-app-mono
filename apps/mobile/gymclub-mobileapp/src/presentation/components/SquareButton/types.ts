import { PropsWithChildren } from 'react';

export interface SquareButtonProps extends PropsWithChildren {
	title: string;
	icon?: JSX.Element;
	onPress?: () => void;
}
