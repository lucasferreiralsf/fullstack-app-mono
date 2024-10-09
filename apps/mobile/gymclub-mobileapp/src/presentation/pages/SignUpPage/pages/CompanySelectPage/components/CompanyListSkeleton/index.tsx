import { View } from 'react-native';

import Skeleton from '@/presentation/components/Skeleton';

export default function CompanyListSkeleton() {
	return (
		<View className="flex gap-4 pb-10">
			<Skeleton className="w-full h-20 rounded-xl" />
			<Skeleton className="w-full h-20 rounded-xl" />
			<Skeleton className="w-full h-20 rounded-xl" />
			<Skeleton className="w-full h-20 rounded-xl" />
			<Skeleton className="w-full h-20 rounded-xl" />
		</View>
	);
}
