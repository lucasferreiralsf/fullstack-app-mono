import { HttpClient } from '@/data/interfaces/http/http-client';

import { ValidateUserDocument } from '@/domain/usecases/validate-user-document';

export class DefaultValidateUserDocument implements ValidateUserDocument {
	constructor(private readonly client: HttpClient) {}

	async run(docNumber: string, tenantId: string): Promise<void> {
		await this.client.request({
			method: 'get',
			url: `/companies/${tenantId}/documents/${docNumber}`,
		});
	}
}
