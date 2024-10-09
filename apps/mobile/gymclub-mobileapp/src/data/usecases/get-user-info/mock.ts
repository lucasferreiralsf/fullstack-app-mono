import { UserModel } from '@/domain/models/user';
import { GetUserInfo } from '@/domain/usecases/get-user-info';

export class MockGetUserInfo implements GetUserInfo {
	run(): Promise<UserModel | null> {
		return Promise.resolve({
			id: '1',
			profileId: '2',
			planId: '3',
			firstName: 'Mac',
			lastName: 'DeMarco',
			emailVerified: true,
			email: 'mac@demarco.com',
		});
	}
}
