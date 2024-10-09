import { describe, expect, spyOn, test } from 'bun:test';
import { PlansRepository } from '../../../src/data/plan/plans-repository';
import { MembershipPlanModel } from '../../../src/domain/models/membership-plan';
import { GetAvailablePlans } from '../../../src/domain/usecases/plan/get-available-plans';

const makeSut = () => {
	const plansRepository: PlansRepository = {
		getPlans: async (): Promise<MembershipPlanModel[]> => [
			{
				id: 'plan1',
				name: 'Basic Plan',
				price: 29.99,
				sku: 'basic-plan',
			},
		],
		getPlanById: async () => ({
			id: 'plan1',
			name: 'Basic Plan',
			price: 29.99,
			sku: 'basic-plan',
		}),
	};

	const sut = new GetAvailablePlans(plansRepository);

	return {
		sut,
		plansRepository,
	};
};

describe('GetAvailablePlans', () => {
	test('should return an empty list if no plans are found', async () => {
		const { sut, plansRepository } = makeSut();
		spyOn(plansRepository, 'getPlans').mockResolvedValueOnce([]);

		const result = await sut.invoke();

		expect(result).toEqual([]);
		expect(plansRepository.getPlans).toHaveBeenCalled();
	});

	test('should return a list of formatted plans', async () => {
		const { sut, plansRepository } = makeSut();
		spyOn(plansRepository, 'getPlans');

		const result = await sut.invoke();

		expect(result).toEqual([
			{ id: 'plan1', name: 'Basic Plan', price: 29.99, sku: 'basic-plan' },
		]);
		expect(plansRepository.getPlans).toHaveBeenCalled();
	});

	test('should correctly parse string prices into numbers', async () => {
		const { sut, plansRepository } = makeSut();
		const mockPlans = [
			{
				id: 'plan1',
				name: 'Standard Plan',
				price: 15.5,
				sku: 'standard-plan',
			},
			{
				id: 'plan2',
				name: 'Advanced Plan',
				price: 100.99,
				sku: 'advanced-plan',
			},
		];
		spyOn(plansRepository, 'getPlans').mockResolvedValueOnce(mockPlans);

		const result = await sut.invoke();

		expect(result).toEqual([
			{ id: 'plan1', name: 'Standard Plan', sku: 'standard-plan', price: 15.5 },
			{
				id: 'plan2',
				name: 'Advanced Plan',
				sku: 'advanced-plan',
				price: 100.99,
			},
		]);
		expect(plansRepository.getPlans).toHaveBeenCalled();
	});
});
