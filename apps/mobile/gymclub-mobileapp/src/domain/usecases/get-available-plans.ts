import { MembershipPlan } from '../models/membership-plan';

export interface GetAvailablePlans {
	run: () => Promise<MembershipPlan[]>;
}
