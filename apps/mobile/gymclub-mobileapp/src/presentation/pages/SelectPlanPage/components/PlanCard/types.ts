import { MembershipPlan } from '@/domain/models/membership-plan';

export interface PlanCardProps {
	plan: MembershipPlan;
	index: number;
	onPress: (plan: MembershipPlan) => void;
}
