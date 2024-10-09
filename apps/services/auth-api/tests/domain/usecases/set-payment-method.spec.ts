import { describe, expect, spyOn, test } from 'bun:test';
import { NotFoundError } from 'elysia';
import { UserRepository } from '../../../src/data/user/user-repository';
import { SetPaymentMethod } from '../../../src/domain/usecases/set-payment-method';
import { mockPaymentProviderService } from '../../infra/payment/mock-payment-provider-service';
import {
	mockAthlete,
	MockUserRepository,
} from '../../infra/user/mock-user-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const paymentProviderService = mockPaymentProviderService;

	const sut = new SetPaymentMethod(userRepository, paymentProviderService);

	return {
		sut,
		userRepository,
		paymentProviderService,
	};
};

describe('ResetPassword', () => {
	test('should search for user by their ID', async () => {
		const { sut, userRepository } = makeSut();
		const findSpy = spyOn(userRepository, 'findAthleteByUserId');

		await sut.invoke({
			userId: 'any_id',
		});

		expect(findSpy).toHaveBeenCalledWith('any_id');
	});

	test('should throw an error if user is not found', async () => {
		const { sut, userRepository } = makeSut();
		spyOn(userRepository, 'findAthleteByUserId').mockResolvedValueOnce(null);

		const promise = sut.invoke({ userId: 'non_existent_id' });

		expect(promise).rejects.toThrow(new NotFoundError('User not found'));
	});

	test('should call payment provider service with user data', async () => {
		const { sut, paymentProviderService } = makeSut();
		const setPaymentMethodSpy = spyOn(
			paymentProviderService,
			'setPaymentMethod',
		);

		const result = await sut.invoke({ userId: 'any_id' });

		expect(setPaymentMethodSpy).toHaveBeenCalledWith(mockAthlete);
		expect(result).toEqual({ clientSecret: 'any_client_secret' });
	});
});
