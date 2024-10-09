import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface CategoryPillProps extends PropsWithClassName {
	label: string;
	selected: boolean;
	onPress: () => void;
}
