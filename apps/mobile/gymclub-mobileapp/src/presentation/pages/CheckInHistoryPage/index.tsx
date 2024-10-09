import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { CheckInHistoryModel } from '@/domain/models/checkin-history';

import GenericHeader from '@/presentation/components/GenericHeader';
import { ArrowLeftIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';

import { CheckInHistoryPageProps } from './types';

export default function CheckInHistoryPage({
	loadCheckInHistory,
}: CheckInHistoryPageProps) {
	const navigation = useNavigation();
	const [history, setHistory] = useState<CheckInHistoryModel[]>([]);

	async function load() {
		const response = await loadCheckInHistory.loadHistory();
		setHistory(response);
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<View className="bg-gymclub-white flex-1">
			<GenericHeader
				title="Histórico"
				leftIcon={
					<TouchableOpacity onPress={() => void navigation.goBack()}>
						<ArrowLeftIcon className="w-10 h-10" />
					</TouchableOpacity>
				}
			/>

			<View className="flex-col gap-6 mb-24">
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-col gap-4 pb-36 items-center">
						{history.map((item, index) => (
							// TODO: Implement History component when is ready on Figma
							<Text className="px-10" key={index}>
								{item.name} - {item.date}
							</Text>
						))}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}
