import { Usecase } from '@gymclub/utils';
import { PlansRepository } from '../../../data/plan/plans-repository';
import { MembershipPlanModel } from '../../models/membership-plan';

export class GetAvailablePlans implements Usecase<void, MembershipPlanModel[]> {
	constructor(private readonly plansRepository: PlansRepository) {}

	async invoke(): Promise<MembershipPlanModel[]> {
		const records = await this.plansRepository.getPlans();
		return records;
	}
}
