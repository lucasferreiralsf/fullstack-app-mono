import { PropsWithChildren } from 'react';

export interface GenericHeaderProps extends PropsWithChildren {
	title: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
}
