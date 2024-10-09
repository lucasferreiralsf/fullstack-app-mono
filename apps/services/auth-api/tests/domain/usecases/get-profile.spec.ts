import { describe, expect, spyOn, test } from 'bun:test';
import { UserRepository } from '../../../src/data/user/user-repository';
import { GetProfile } from '../../../src/domain/usecases/get-profile';
import { MockUserRepository } from '../../infra/user/mock-user-repository';

const makeSut = () => {
	const userRepository = new MockUserRepository() as UserRepository;
	const sut = new GetProfile(userRepository);

	return {
		sut,
		userRepository,
	};
};

describe('GetProfile Usecase', () => {
	describe('invoke', () => {
		test('should return null if user is not found', async () => {
			const { sut, userRepository } = makeSut();
			spyOn(userRepository, 'findAthleteByUserId').mockResolvedValueOnce(null);

			const result = await sut.invoke({
				id: 'non_existent_id',
			});

			expect(result).toBeNull();
			expect(userRepository.findAthleteByUserId).toHaveBeenCalledWith(
				'non_existent_id',
			);
		});

		test('should return user data without password and id', async () => {
			const { sut, userRepository } = makeSut();
			spyOn(userRepository, 'findAthleteByUserId');

			const result = await sut.invoke({ id: 'any_id' });

			const teste = {
				id: 'any_id',
				profileId: 'any_profile_id',
				email: 'any_email@mail.com',
				username: 'any_username',
				firstName: 'any_firstname',
				lastName: 'any_lastname',
				emailVerified: false,
			};

			expect(result).toEqual(teste);

			expect(userRepository.findAthleteByUserId).toHaveBeenCalledWith('any_id');
		});
	});
});
