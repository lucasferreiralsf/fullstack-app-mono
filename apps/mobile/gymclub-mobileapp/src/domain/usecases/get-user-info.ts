import { UserModel } from '../models/user';

export interface GetUserInfo {
	run: () => Promise<UserModel | null>;
}
