import { DataStorage } from '@/data/interfaces/data-storage';
import { HttpClient } from '@/data/interfaces/http/http-client';

import { SignInModel } from '@/domain/models/signin';
import { SignIn } from '@/domain/usecases/signin';

export class DefaultSignIn implements SignIn {
	constructor(
		private readonly client: HttpClient,
		private readonly secureStorage: DataStorage,
	) {}

	async run(email: string, password: string): Promise<SignInModel | null> {
		const response = await this.client.request<SignInDto>({
			method: 'post',
			url: '/auth/signin',
			body: { email, password },
		});

		const { sessionId, ...rest } = response.body;
		await this.secureStorage.set('session-id', response.body.sessionId);

		return rest;
	}
}

export interface SignInDto {
	message: string;
	emailVerified: boolean;
	sessionId: string;
}
