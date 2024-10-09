import {
	HomeIcon,
	LocationCheckIcon,
	ProfileIcon,
	SearchIcon,
} from '@/presentation/components/icons';
import { AppPage } from '@/presentation/enums/app-page';

import { TabBarIconProps } from './types';

export default function TabBarIcon({ name, color }: TabBarIconProps) {
	return {
		[AppPage.HOME]: <HomeIcon className="h-7 w-7" color={color} />,
		[AppPage.CHECK_IN]: <LocationCheckIcon className="h-7 w-7" color={color} />,
		[AppPage.SEARCH]: <SearchIcon className="h-7 w-7" color={color} />,
		[AppPage.PROFILE]: <ProfileIcon className="h-7 w-7" color={color} />,
	}[name];
}
