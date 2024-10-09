import { HttpClient } from '@/data/interfaces/http/http-client';

import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';

export class DefaultRequestEmailVerificationCode
	implements RequestEmailVerificationCode
{
	constructor(private readonly client: HttpClient) {}

	async run(email: string): Promise<void> {
		await this.client.request({
			method: 'post',
			url: '/auth/email-verification/request',
			body: { email },
		});
	}
}
