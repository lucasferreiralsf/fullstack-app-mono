import { PropsWithChildren } from 'react';

import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface ButtonProps extends PropsWithClassName, PropsWithChildren {
	onPress: () => void;
	disabled?: boolean;
}
