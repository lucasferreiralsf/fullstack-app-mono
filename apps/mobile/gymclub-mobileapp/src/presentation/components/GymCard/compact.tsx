import { Image, View } from 'react-native';

import { StarIcon } from '@/presentation/components/icons';
import Text from '@/presentation/components/Text';
import { colors } from '@/presentation/styles/colors';

import { GymCardComponentProps } from './types';

export default function GymCardCompact(props: GymCardComponentProps) {
	const {
		name,
		address,
		distance,
		rating,
		isOpen,
		closingTime,
		image,
		className,
	} = props;

	return (
		<View
			className={`bg-gymclub-white flex-row p-3 gap-3 rounded-xl shadow-gymclub-2 ${className}`}
		>
			<Image
				source={{ uri: image }}
				className="rounded-lg bg-gymclub-gray-200 flex-2"
			/>

			<View className="flex-5 gap-3">
				<View>
					<View className="flex-row items-center gap-2">
						<Text
							className="font-gymclub-semi-bold text-lg max-w-[75%]"
							numberOfLines={1}
						>
							{name}
						</Text>

						<View className="flex-row items-center gap-2">
							<StarIcon
								className="h-4 w-4"
								color={colors.gymclub.yellow[450]}
							/>
							<Text className="font-gymclub-bold text-gymclub-yellow-450 text-lg">
								{rating.toFixed(1)}
							</Text>
						</View>
					</View>

					<Text
						className={`font-gymclub-semi-bold text-sm ${
							isOpen ? 'text-gymclub-success-100' : 'text-gymclub-dark-gray-400'
						}`}
					>
						{isOpen
							? 'Disponível no seu plano'
							: 'Disponível no plano Platinum'}
					</Text>
				</View>

				<View>
					<View className="flex-row gap-2 items-center">
						<Text className="text-gymclub-gray-700 font-gymclub-medium text-sm">
							{address}
						</Text>
						<Text className="text-gymclub-gray-700 font-gymclub-medium text-sm">
							-
						</Text>
						<Text className="text-gymclub-gray-700 font-gymclub-medium text-sm">
							{distance}
						</Text>
					</View>

					<View className="flex-row gap-2 items-center">
						<Text
							className={`font-gymclub-semi-bold text-sm ${
								isOpen
									? 'text-gymclub-success-100'
									: 'text-gymclub-dark-gray-400'
							}`}
						>
							{isOpen ? 'Aberto' : 'Fechado'}
						</Text>
						<Text className="w-1 h-1 rounded-full bg-gray-300"></Text>
						<Text className="text-gymclub-gray-700 font-gymclub-medium text-sm">
							Fecha as {closingTime}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
