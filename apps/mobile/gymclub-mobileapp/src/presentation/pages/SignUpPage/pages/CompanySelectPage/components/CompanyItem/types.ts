import { TouchableOpacityProps } from 'react-native';

import { CompanyModel } from '@/domain/models/company';

import { PropsWithClassName } from '@/presentation/interfaces/PropsWithClassName';

export interface CompanyItemProps
	extends TouchableOpacityProps,
		PropsWithClassName {
	company: CompanyModel;
	isSelected: boolean;
	onClosePress?: () => void;
}
