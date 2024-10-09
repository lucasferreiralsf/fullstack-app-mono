import { HttpClient } from '@/data/interfaces/http/http-client';

import { ResetPassword } from '@/domain/usecases/reset-password';

export class DefaultResetPassword implements ResetPassword {
	constructor(private readonly client: HttpClient) {}

	async run(token: string, email: string, password: string): Promise<void> {
		await this.client.request({
			method: 'post',
			url: '/auth/password-reset/change',
			body: { token, email, password },
		});
	}
}
