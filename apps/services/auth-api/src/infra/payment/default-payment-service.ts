import { NotFoundError } from 'elysia';
import { PaymentProviderService } from '../../data/payment/payment-provider-service';
import { PaymentService } from '../../data/payment/payment-service';
import { PlansRepository } from '../../data/plan/plans-repository';
import { SubscriptionRepository } from '../../data/subscription/subscription-repository';
import { UserRepository } from '../../data/user/user-repository';
import { UserAthleteModel } from '../../domain/models/user';

export class DefaultPaymentService implements PaymentService {
	constructor(
		private readonly paymentProviderService: PaymentProviderService,
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly userRepository: UserRepository,
		private readonly plansRepository: PlansRepository,
	) {}

	async createCustomer(user: UserAthleteModel): Promise<void> {
		const customer =
			await this.paymentProviderService.createExternalCustomer(user);
		await this.userRepository.setAthleteCustomerId(user, customer.customerId);
	}

	async subscribeAthlete(
		userId: string,
		providerSubscriptionId: string,
		planSku: string,
	): Promise<void> {
		const [user, plan] = await Promise.all([
			this.userRepository.findAthleteByUserId(userId),
			this.plansRepository.findBySku(planSku),
		]);

		if (!user) throw new NotFoundError('User not found');
		if (!plan) throw new NotFoundError('Plan not found');

		await this.subscriptionRepository.create(
			user.profile.id,
			plan.id,
			providerSubscriptionId,
		);
	}
}
