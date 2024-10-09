import { SafeAreaView, View } from 'react-native';

import Text from '@/presentation/components/Text';

import { GenericHeaderProps } from './types';

export default function GenericHeader(props: GenericHeaderProps) {
	const { title, leftIcon, rightIcon } = props;

	return (
		<SafeAreaView>
			<View className="my-2">
				<View className="px-6 absolute z-10 top-0 bottom-0 flex items-center justify-center">
					{leftIcon && leftIcon}
				</View>

				<Text className="font-gymclub-bold py-6 text-2xl text-center text-gymclub-black">
					{title}
				</Text>

				<View className="px-6 absolute z-10 right-0 top-0 bottom-0 flex items-center justify-center">
					{rightIcon && rightIcon}
				</View>
			</View>
		</SafeAreaView>
	);
}
