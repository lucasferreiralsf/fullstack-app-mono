import { PlanSku } from './enums/plan-sku';

export interface MembershipPlan {
	id: string;
	name: string;
	price: number;
	description: string;
	sku: PlanSku;
}
