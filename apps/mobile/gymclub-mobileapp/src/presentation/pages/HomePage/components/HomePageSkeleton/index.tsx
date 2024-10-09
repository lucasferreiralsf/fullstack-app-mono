import { View } from 'react-native';

import Skeleton from '@/presentation/components/Skeleton';

export default function HomePageSkeleton() {
	return (
		<View className="flex-1 flex-col bg-gymclub-white px-6">
			<Skeleton className="w-full h-12 mb-10 rounded-full py-3 px-5" />

			<View className="flex-row items-center justify-between mt-1 mb-4">
				<Skeleton className="w-40 h-6 rounded-lg" />
				<Skeleton className="w-24 h-6 rounded-lg" />
			</View>

			<View className="flex-row items-center mt-1 mb-12">
				<Skeleton className="w-96 h-74 mr-8 rounded-lg" />
				<Skeleton className="w-96 h-74 mr-8 rounded-lg" />
			</View>

			<View className="flex-row items-center justify-between mt-1 mb-4">
				<Skeleton className="w-40 h-6 rounded-lg" />
				<Skeleton className="w-24 h-6 rounded-lg" />
			</View>

			<View className="flex-row items-center mt-1">
				<Skeleton className="w-96 h-74 mr-8 rounded-lg" />
				<Skeleton className="w-96 h-74 mr-8 rounded-lg" />
			</View>
		</View>
	);
}
