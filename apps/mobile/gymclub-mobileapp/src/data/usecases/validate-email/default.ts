import { HttpClient } from '@/data/interfaces/http/http-client';

import { ValidateEmail } from '@/domain/usecases/validate-email';

export class DefaultValidateEmail implements ValidateEmail {
	constructor(private readonly client: HttpClient) {}

	async run(code: string, email: string): Promise<void> {
		await this.client.request({
			method: 'post',
			url: '/auth/email-verification/validate-code',
			body: { code, email },
		});
	}
}
