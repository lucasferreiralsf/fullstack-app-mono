import React from 'react';
import { Text, View } from 'react-native';

import { CircleCheckIcon } from '@/presentation/components/icons';
import { colors } from '@/presentation/styles/colors';

import { PasswordCriteriaItemProps } from './types';

export default function PasswordCriteriaItem({
	satisfied,
	label,
}: PasswordCriteriaItemProps) {
	const {
		gymclub: { gray, success },
	} = colors;

	return (
		<View className="flex-row items-center gap-1">
			<CircleCheckIcon
				className="h-5 w-5"
				color={satisfied ? success[200] : gray[500]}
			/>
			<Text
				className={`font-gymclub-regular ${satisfied ? 'text-gymclub-success-200' : 'text-gymclub-gray-500'}`}
			>
				{label}
			</Text>
		</View>
	);
}
