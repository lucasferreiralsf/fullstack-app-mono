import { Usecase } from '@gymclub/utils';
import { UserRepository } from '../../data/user/user-repository';

export class GetProfile implements Usecase<Params, UserProfileModel | null> {
	constructor(private readonly userRepository: UserRepository) {}

	async invoke({ id }: Params): Promise<UserProfileModel | null> {
		const user = await this.userRepository.findAthleteByUserId(id);
		if (!user) return null;

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			emailVerified: user.emailVerified,
			profileId: user.profile.id,
		} as UserProfileModel;
	}
}

export interface Params {
	id: string;
}

interface UserProfileModel {
	id: string;
	profileId: string;
	email: string;
	username?: string;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
}
