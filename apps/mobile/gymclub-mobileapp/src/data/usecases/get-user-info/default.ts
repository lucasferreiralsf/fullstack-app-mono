import { HttpClient } from '@/data/interfaces/http/http-client';

import { UserModel } from '@/domain/models/user';
import { GetUserInfo } from '@/domain/usecases/get-user-info';

export class DefaultGetUserInfo implements GetUserInfo {
	constructor(private readonly client: HttpClient) {}

	async run(): Promise<UserModel | null> {
		const response = await this.client.request<GetUserInfoDto>({
			method: 'get',
			url: '/users/profile',
		});

		return response.body;
	}
}

export interface GetUserInfoDto {
	id: string;
	profileId: string;
	planId: string | null;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
	email: string;
}
