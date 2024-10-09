import {
	PlanNotFoundError,
	UserNotFoundError,
} from '@gymclub/auth-api/utils/custom-errors';
import { Usecase } from '@gymclub/utils';
import { PaymentProviderService } from '../../../data/payment/payment-provider-service';
import { PlansRepository } from '../../../data/plan/plans-repository';
import { SubscriptionRepository } from '../../../data/subscription/subscription-repository';
import { UserRepository } from '../../../data/user/user-repository';
import { SubscriptionStatus } from '../../enums/subscription-status';
import { MembershipPlanModel } from '../../models/membership-plan';
import { SubscriptionModel } from '../../models/subscription';
import { UserAthleteModel } from '../../models/user';

export class ChoosePlan implements Usecase<Params, Result> {
	constructor(
		private readonly plansRepository: PlansRepository,
		private readonly userRepository: UserRepository,
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly paymentProviderService: PaymentProviderService,
	) {}

	async invoke(params: Params): Promise<Result> {
		const { athlete, plan, subscription } = await this.getResources(params);

		if (!subscription || subscription.status === SubscriptionStatus.INACTIVE) {
			await this.paymentProviderService.createExternalSubscription(
				athlete,
				plan,
			);
			return;
		}

		await this.paymentProviderService.updateSubscriptionPlan(
			athlete,
			subscription,
			plan,
		);
	}

	private async getResources({ userId, planId }: Params): Promise<{
		athlete: UserAthleteModel;
		plan: MembershipPlanModel;
		subscription: SubscriptionModel | null;
	}> {
		const [athlete, plan] = await Promise.allSettled([
			this.userRepository.findAthleteByUserId(userId),
			this.plansRepository.getPlanById(planId),
		]);

		if (athlete.status === 'rejected' || !athlete.value)
			throw new UserNotFoundError();
		if (plan.status === 'rejected' || !plan.value)
			throw new PlanNotFoundError();

		const subscription =
			await this.subscriptionRepository.findByAthleteProfileId(
				athlete.value.profile.id,
			);

		return { athlete: athlete.value, plan: plan.value, subscription };
	}
}

interface Params {
	planId: string;
	userId: string;
}

type Result = void;
