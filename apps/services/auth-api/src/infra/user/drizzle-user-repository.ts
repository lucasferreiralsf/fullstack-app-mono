import {
	athleteProfile,
	AthleteProfileTable,
	UserTable,
	user as userTable,
} from '@gymclub/db';
import { DrizzleDbClient } from '@gymclub/db/db';
import { eq, getTableColumns } from 'drizzle-orm';
import {
	CreateUserParams,
	UserRepository,
	UserWithPassword,
} from '../../data/user/user-repository';
import { UserAthleteModel, UserModel } from '../../domain/models/user';

export class DrizzleUserRepository implements UserRepository {
	constructor(private readonly client: DrizzleDbClient) {}

	async findByEmail(email: string): Promise<UserModel | null> {
		const foundUser = await this.client.query.user.findFirst({
			where: eq(userTable.email, email),
		});

		return foundUser ? this.toUserModel(foundUser) : null;
	}

	async findUserWithPasswordByEmail(
		email: string,
	): Promise<UserWithPassword | null> {
		const foundUser = await this.client.query.user.findFirst({
			where: eq(userTable.email, email),
		});

		return foundUser
			? { ...this.toUserModel(foundUser), password: foundUser.password! }
			: null;
	}

	async findAthleteByUserId(userId: string): Promise<UserAthleteModel | null> {
		const result = await this.client
			.select({
				user: getTableColumns(userTable),
				profile: getTableColumns(athleteProfile),
			})
			.from(userTable)
			.leftJoin(athleteProfile, eq(userTable.id, athleteProfile.userId))
			.where(eq(userTable.id, userId));

		if (result.length === 0) return null;

		return this.toUserAthleteModel(
			result[0].user,
			result[0].profile as AthleteProfileTable,
		);
	}

	async updateEmailVerified(email: string): Promise<void> {
		await this.client
			.update(userTable)
			.set({ emailVerified: true })
			.where(eq(userTable.email, email));
	}

	async updatePassword(id: string, password: string): Promise<void> {
		await this.client
			.update(userTable)
			.set({ password })
			.where(eq(userTable.id, id));
	}

	async setAthleteCustomerId(
		user: UserAthleteModel,
		providerCustomerId: string,
	): Promise<void> {
		await this.client
			.update(athleteProfile)
			.set({ providerCustomerId })
			.where(eq(athleteProfile.id, user.profile.id));
	}

	async createAthlete(params: CreateUserParams): Promise<UserAthleteModel> {
		return this.client.transaction(async (transaction) => {
			const [createdUser] = await transaction
				.insert(userTable)
				.values({ ...params, emailVerified: false })
				.returning(getTableColumns(userTable));

			const [createdProfile] = await transaction
				.insert(athleteProfile)
				.values({ ...params, docType: 'NIF', userId: createdUser.id })
				.returning(getTableColumns(athleteProfile));

			return this.toUserAthleteModel(createdUser, createdProfile);
		});
	}

	private toUserAthleteModel(
		user: UserTable,
		profile: AthleteProfileTable,
	): UserAthleteModel {
		return {
			...this.toUserModel(user),
			profile: {
				id: profile.id,
				providerCustomerId: profile.providerCustomerId,
				docType: profile.docType,
				docNumber: profile.docNumber,
			},
		};
	}

	private toUserModel(user: UserTable): UserModel {
		return {
			id: user.id,
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? '',
			email: user.email,
			username: user.username ?? '',
			emailVerified: !!user.emailVerified,
		};
	}
}
