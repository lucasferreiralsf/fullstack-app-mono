import { GetProfile } from '../../domain/usecases/get-profile';
import { makeUserRepository } from './user-repository';

export const makeGetProfile = () => {
	const userRepository = makeUserRepository();
	return new GetProfile(userRepository);
};
