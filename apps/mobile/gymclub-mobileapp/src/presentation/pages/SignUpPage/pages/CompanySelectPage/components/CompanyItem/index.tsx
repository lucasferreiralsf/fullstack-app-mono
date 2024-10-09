import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BuildingIcon, CircleXIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';

import { CompanyItemProps } from './types';

export default function CompanyItem({
	company,
	isSelected,
	onPress,
	onClosePress,
	className,
}: CompanyItemProps) {
	const companyItemClasses = useMemo(() => {
		const baseClasses = 'p-4 rounded-xl flex-row items-center justify-between';
		const selectedClasses = 'border border-gymclub-gray-300';
		const unselectedClasses = 'bg-gymclub-dark-gray-100';

		return `${className} ${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`;
	}, [isSelected]);

	return (
		<TouchableOpacity
			activeOpacity={onPress ? 0.2 : 1}
			onPress={onPress}
			className={companyItemClasses}
		>
			<View className="flex-row gap-3 items-center">
				<BuildingIcon className="h-8 w-8" />

				<View className="flex gap-1">
					<Text className="text-gymclub-black font-gymclub-semi-bold">
						{company.name}
					</Text>

					<Text className="text-gymclub-black font-gymclub-regular text-sm">
						{company.city}
					</Text>
				</View>
			</View>

			{onClosePress && (
				<TouchableOpacity onPress={onClosePress}>
					<CircleXIcon className="h-8 w-8" />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
}
