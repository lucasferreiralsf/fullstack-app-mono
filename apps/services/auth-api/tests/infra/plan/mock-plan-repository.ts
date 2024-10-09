import { PlansRepository } from '../../../src/data/plan/plans-repository';
import { MembershipPlanModel } from '../../../src/domain/models/membership-plan';

export const mockPlan: MembershipPlanModel = {
	id: 'plan1',
	name: 'Basic Plan',
	sku: 'basic-plan',
	price: 29.99,
};

export const mockPlansRepository: PlansRepository = {
	getPlanById: async () => mockPlan,
	getPlans: async () => [],
	findBySku: async (planSku) => mockPlan,
};
