import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { MembershipPlan } from '@/domain/models/membership-plan';

import PlanCard from './components/PlanCard';
import SelectPlanHeader from './components/SelectPlanHeader';
import { SelectPlanPageProp } from './types';

export default function SelectPlanPage({
	getAvailablePlans,
}: SelectPlanPageProp) {
	const [plans, setPlans] = useState<MembershipPlan[]>();

	const handleOnPressCard = async (plan: MembershipPlan) => {
		router.push({
			pathname: '/payment-page',
			params: { ...plan },
		});
	};

	const initialize = async () => {
		const response = await getAvailablePlans.run();
		setPlans(response);
	};

	useEffect(() => {
		initialize();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-gymclub-white">
			<SelectPlanHeader />

			<View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{plans?.map((plan, index) => (
						<PlanCard
							onPress={handleOnPressCard}
							key={index}
							plan={plan}
							index={index}
						/>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
