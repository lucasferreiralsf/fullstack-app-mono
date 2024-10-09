import { plan, PlanTable } from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { eq } from 'drizzle-orm';
import { PlansRepository } from '../../data/plan/plans-repository';
import { MembershipPlanModel } from '../../domain/models/membership-plan';

export class DrizzlePlanRepository implements PlansRepository {
	constructor(private readonly client: DrizzleDbClient) {}

	async getPlanById(planId: string): Promise<MembershipPlanModel | null> {
		const record = await this.client.query.plan.findFirst({
			where: eq(plan.id, planId),
		});
		return record ? this.fromTableToModel(record) : null;
	}

	async getPlans(): Promise<MembershipPlanModel[]> {
		const result = await this.client.query.plan.findMany();
		return result.map(this.fromTableToModel.bind(this));
	}

	async findBySku(sku: string): Promise<MembershipPlanModel | null> {
		const record = await this.client.query.plan.findFirst({
			where: eq(plan.sku, sku),
		});
		return this.fromTableToModel(record as PlanTable);
	}

	private fromTableToModel = (dto: PlanTable): MembershipPlanModel => ({
		id: dto.id,
		name: dto.name,
		sku: dto.sku,
		price: Number(dto.price),
	});
}
