import {
	PlanNotFoundError,
	UserNotFoundError,
} from '@gymclub/auth-api/utils/custom-errors';
import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { ChoosePlan } from '../../../src/domain/usecases/plan/choose-plan';
import { mockPaymentProviderService } from '../../infra/payment/mock-payment-provider-service';
import {
	mockPlan,
	mockPlansRepository,
} from '../../infra/plan/mock-plan-repository';
import {
	mockSubscription,
	MockSubscriptionRepository,
} from '../../infra/subscriptions/mock-subscription-repository';
import {
	mockAthlete,
	MockUserRepository,
} from '../../infra/user/mock-user-repository';

const makeSut = () => {
	const plansRepository = mockPlansRepository;
	const userRepository = new MockUserRepository() as UserRepository;
	const paymentProviderService = mockPaymentProviderService;
	const subscriptionRepository = new MockSubscriptionRepository();

	const sut = new ChoosePlan(
		plansRepository,
		userRepository,
		subscriptionRepository,
		paymentProviderService,
	);

	return {
		sut,
		plansRepository,
		userRepository,
		subscriptionRepository,
		paymentProviderService,
	};
};

describe('ChoosePlan', () => {
	const USER_ID = 'valid_user_id';
	const PLAN_ID = 'valid_plan_id';

	test('should throw an error if plan does not exist', async () => {
		const { sut, plansRepository } = makeSut();
		spyOn(plansRepository, 'getPlanById').mockResolvedValueOnce(null);

		const promise = sut.invoke({ userId: USER_ID, planId: PLAN_ID });

		expect(promise).rejects.toThrow(new PlanNotFoundError());
		expect(plansRepository.getPlanById).toHaveBeenCalledWith(PLAN_ID);
	});

	test('should throw an error if user does not exist', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findAthleteByUserId').mockResolvedValueOnce(null);

		const promise = sut.invoke({ userId: USER_ID, planId: PLAN_ID });

		expect(promise).rejects.toThrow(new UserNotFoundError());
		expect(userRepository.findAthleteByUserId).toHaveBeenCalledWith(USER_ID);
	});

	test('should create subscription if it doesnt exist', async () => {
		const { sut, subscriptionRepository } = makeSut();
		spyOn(
			subscriptionRepository,
			'findByAthleteProfileId',
		).mockResolvedValueOnce(null);

		const createExternalSubscriptionSpy = spyOn(
			mockPaymentProviderService,
			'createExternalSubscription',
		);

		await sut.invoke({ userId: USER_ID, planId: PLAN_ID });

		expect(createExternalSubscriptionSpy).toHaveBeenCalledWith(
			mockAthlete,
			mockPlan,
		);
	});

	test('should update subscription if it already exists', async () => {
		const { sut, paymentProviderService } = makeSut();
		const updateSubscriptionPlanSpy = spyOn(
			paymentProviderService,
			'updateSubscriptionPlan',
		);

		await sut.invoke({ userId: USER_ID, planId: PLAN_ID });

		expect(updateSubscriptionPlanSpy).toHaveBeenCalledWith(
			mockAthlete,
			mockSubscription,
			mockPlan,
		);
	});

	test('return should be undefined', async () => {
		const { sut } = makeSut();

		const result = sut.invoke({ userId: USER_ID, planId: PLAN_ID });

		expect(result).resolves.toBeUndefined();
	});
});
