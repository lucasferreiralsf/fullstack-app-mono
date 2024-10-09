import { View } from 'react-native';

import Text from '@/presentation/components/Text';
import TextInput from '@/presentation/components/TextInput';

import { DocNumberInputProps } from './types';

export default function DocNumberInput({
	docNumber,
	setDocNumber,
	hasError,
}: DocNumberInputProps) {
	return (
		<View className="mb-6">
			<TextInput
				keyboardType="number-pad"
				placeholder="000000000"
				label="NIF"
				value={docNumber}
				onChangeText={setDocNumber}
			/>

			{hasError && (
				<Text className="mt-2 text-red-400">
					<Text className="font-gymclub-bold text-red-400">Ops!</Text> Este NIF
					não foi encontrado na empresa selecionada, tente novamente.
				</Text>
			)}
		</View>
	);
}
