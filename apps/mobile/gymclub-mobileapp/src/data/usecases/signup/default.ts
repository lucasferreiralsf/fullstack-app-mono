import { DataStorage } from '@/data/interfaces/data-storage';
import { HttpClient } from '@/data/interfaces/http/http-client';

import { SignUpModel } from '@/domain/models/signup';
import { SignUp, SignUpFormPayload } from '@/domain/usecases/signup';

export class RemoteSignUp implements SignUp {
	constructor(
		private readonly client: HttpClient,
		private readonly secureStorage: DataStorage,
	) {}

	async run(payload: SignUpFormPayload): Promise<SignUpModel | null> {
		const response = await this.client.request<SignUpDto>({
			method: 'post',
			url: '/auth/signup',
			body: payload,
		});
		const { sessionId, ...rest } = response.body;

		await this.secureStorage.set('session-id', sessionId);

		return rest ?? null;
	}
}

export interface SignUpDto {
	message: string;
	sessionId: string;
}
