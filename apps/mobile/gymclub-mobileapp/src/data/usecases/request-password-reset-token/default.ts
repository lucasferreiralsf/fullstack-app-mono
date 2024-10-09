import { HttpClient } from '@/data/interfaces/http/http-client';

import { RequestPasswordResetToken } from '@/domain/usecases/request-password-reset-token';

export class DefaultRequestPasswordResetToken
	implements RequestPasswordResetToken
{
	constructor(private readonly client: HttpClient) {}

	async run(email: string): Promise<void> {
		await this.client.request({
			method: 'post',
			url: '/auth/password-reset/request',
			body: { email },
		});
	}
}
