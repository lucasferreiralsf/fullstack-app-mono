import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

interface GymCardBaseProps extends PropsWithClassName {
	name: string;
	address: string;
	distanceInMeters: number;
	rating: number;
	isOpen: boolean;
	closingTime: string;
	image: string;
	className?: string;
}

export interface GymCardProps extends GymCardBaseProps {
	isCompact?: boolean;
}

export interface GymCardComponentProps extends GymCardBaseProps {
	distance: string;
}
