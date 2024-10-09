import { HttpClient } from '@/data/interfaces/http/http-client';

import { ValidatePasswordResetToken } from '@/domain/usecases/validate-password-reset-token';

export class DefaultValidatePasswordResetToken
	implements ValidatePasswordResetToken
{
	constructor(private readonly client: HttpClient) {}

	async run(token: string, email: string): Promise<void> {
		await this.client.request({
			method: 'post',
			url: '/auth/password-reset/validate-code',
			body: { token, email },
		});
	}
}
