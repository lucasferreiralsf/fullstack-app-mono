import { MembershipPlanModel } from '../../domain/models/membership-plan';

export interface PlansRepository {
	getPlans: () => Promise<MembershipPlanModel[]>;
	getPlanById: (planId: string) => Promise<MembershipPlanModel | null>;
	findBySku: (planSku: string) => Promise<MembershipPlanModel | null>;
}
