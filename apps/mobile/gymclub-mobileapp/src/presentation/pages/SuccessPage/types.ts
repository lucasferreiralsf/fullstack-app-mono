import { RouteProp } from '@react-navigation/native';
import { Href } from 'expo-router';

export type SuccessScreenRouteProp = RouteProp<
	{
		Success: {
			title: string;
			subtitle: string;
			buttonText: string;
			onPressDestination: Href<string>;
		};
	},
	'Success'
>;
