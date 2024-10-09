import { PropsWithChildren } from 'react';

export interface LeftTextHeaderProps extends PropsWithChildren {
	title: string;
	onPress: () => void;
}
