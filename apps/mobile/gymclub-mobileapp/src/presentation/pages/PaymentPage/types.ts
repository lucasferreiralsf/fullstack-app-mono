import { RouteProp } from '@react-navigation/native';
import { Href } from 'expo-router';

import { MembershipPlan } from '@/domain/models/membership-plan';
import { ChoosePlan } from '@/domain/usecases/choose-plan';
import { SetPaymentMethod } from '@/domain/usecases/set-payment-method';

export type PaymentRouteProp = RouteProp<
	{
		Payment: MembershipPlan & {
			backUrl?: Href<string>;
		};
	},
	'Payment'
>;

export interface PaymentPageProps {
	choosePlan: ChoosePlan;
	setPaymentMethod: SetPaymentMethod;
}
