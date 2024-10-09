import { View } from 'react-native';

import Text from '@/presentation/components/Text';

import CompanyItem from '../CompanyItem';
import { CompanyListProps } from './types';

export default function CompanyList({
	companies,
	noResults,
	selectCompany,
}: CompanyListProps) {
	if (noResults)
		return (
			<View className="p-20">
				<Text className="text-center font-gymclub-medium text-gymclub-gray-500 text-lg">
					<Text className="font-gymclub-bold text-gymclub-gray-500">Ops!</Text>{' '}
					Nenhum resultado encontrado.
				</Text>
			</View>
		);

	return (
		companies.length > 0 && (
			<View className="flex gap-4 pb-10">
				{companies.map((company) => (
					<CompanyItem
						isSelected={false}
						key={company.tenantId}
						company={company}
						onPress={() => void selectCompany(company)}
					/>
				))}
			</View>
		)
	);
}
