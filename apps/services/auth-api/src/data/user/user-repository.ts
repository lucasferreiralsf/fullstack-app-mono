import { UserAthleteModel, UserModel } from '../../domain/models/user';

export interface UserRepository {
	findByEmail: (email: string) => Promise<UserModel | null>;

	findUserWithPasswordByEmail: (
		email: string,
	) => Promise<UserWithPassword | null>;
	updateEmailVerified: (email: string) => Promise<void>;

	updatePassword: (id: string, password: string) => Promise<void>;

	findAthleteByUserId: (userId: string) => Promise<UserAthleteModel | null>;

	createAthlete: (params: CreateUserParams) => Promise<UserAthleteModel>;

	setAthleteCustomerId: (
		user: UserAthleteModel,
		customerId: string,
	) => Promise<void>;
}

export interface CreateUserParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	tenantId: string;
	docNumber: string;
}

export interface UserWithPassword extends UserModel {
	password: string;
}
