import { describe, expect, spyOn, test } from 'bun:test';
import { DefaultPaymentService } from '../../../src/infra/payment/default-payment-service';
import { mockPlansRepository } from '../plan/mock-plan-repository';
import { MockSubscriptionRepository } from '../subscriptions/mock-subscription-repository';
import { mockAthlete, MockUserRepository } from '../user/mock-user-repository';
import { mockPaymentProviderService } from './mock-payment-provider-service';

const makeSut = () => {
	const paymentProviderService = mockPaymentProviderService;
	const subscriptionRepository = new MockSubscriptionRepository();
	const userRepository = new MockUserRepository();
	const plansRepository = mockPlansRepository;

	const sut = new DefaultPaymentService(
		paymentProviderService,
		subscriptionRepository,
		userRepository,
		plansRepository,
	);

	return {
		sut,
		paymentProviderService,
		subscriptionRepository,
		userRepository,
		plansRepository,
	};
};

describe('DefaultPaymentService', () => {
	describe('createCustomer', () => {
		test('should create external customer and update user with customerId', async () => {
			const { sut, paymentProviderService, userRepository } = makeSut();
			const createExternalCustomerSpy = spyOn(
				paymentProviderService,
				'createExternalCustomer',
			);
			const setCustomerIdSpy = spyOn(userRepository, 'setAthleteCustomerId');

			await sut.createCustomer(mockAthlete);

			expect(createExternalCustomerSpy).toHaveBeenCalledWith(mockAthlete);
			expect(setCustomerIdSpy).toHaveBeenCalledWith(
				mockAthlete,
				'any_customer_id',
			);
		});
	});

	describe('subscribeAthlete', () => {
		test('should throw an error if user is not found', async () => {
			const { sut, userRepository } = makeSut();
			spyOn(userRepository, 'findAthleteByUserId').mockResolvedValueOnce(null);

			const promise = sut.subscribeAthlete(
				'any_provider_customer_id',
				'any_provider_subscription_id',
				'any_plan_sku',
			);

			expect(promise).rejects.toThrowError('User not found');
		});

		test('should throw an error if plan is not found', async () => {
			const { sut, plansRepository } = makeSut();
			spyOn(plansRepository, 'findBySku').mockResolvedValueOnce(null);

			const promise = sut.subscribeAthlete(
				'any_provider_customer_id',
				'any_provider_subscription_id',
				'any_plan_sku',
			);

			expect(promise).rejects.toThrowError('Plan not found');
		});

		test('should create a subscription and set athlete plan', async () => {
			const { sut, subscriptionRepository } = makeSut();

			const createSpy = spyOn(subscriptionRepository, 'create');

			await sut.subscribeAthlete(
				'any_provider_customer_id',
				'any_subscription_id',
				'basic-plan',
			);

			expect(createSpy).toHaveBeenCalledWith(
				'any_profile_id',
				'plan1',
				'any_subscription_id',
			);
		});
	});
});
