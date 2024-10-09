import { UserTable } from '@gymclub/db';
import {
	CreateUserParams,
	UserRepository,
	UserWithPassword,
} from '../../../src/data/user/user-repository';
import { UserAthleteModel, UserModel } from '../../../src/domain/models/user';

export const mockUser: UserModel = {
	id: 'any_id',
	email: 'any_email@mail.com',
	username: 'any_username',
	firstName: 'any_firstname',
	lastName: 'any_lastname',
	emailVerified: false,
};

export const mockAthlete: UserAthleteModel = {
	...mockUser,
	profile: {
		id: 'any_profile_id',
		providerCustomerId: 'any_provider_id',
		docNumber: 'any_doc_number',
		docType: 'any_doc_type',
	},
};

export class MockUserRepository implements UserRepository {
	async findByEmail(): Promise<UserModel | null> {
		return mockUser;
	}

	async findUserWithPasswordByEmail(): Promise<UserWithPassword | null> {
		return { ...mockUser, password: 'any_password' };
	}

	async create(params: CreateUserParams): Promise<UserTable> {
		return {
			...params,
			id: 'any_id',
			username: 'any_username',
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}

	async updateEmailVerified(): Promise<void> {}

	async updatePassword(): Promise<void> {}

	async findAthleteByUserId(): Promise<UserAthleteModel | null> {
		return mockAthlete;
	}

	async createAthlete(): Promise<UserAthleteModel> {
		return mockAthlete;
	}

	async setAthleteCustomerId(): Promise<void> {}
}
