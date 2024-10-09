import { ValidateUserDocument } from '@/domain/usecases/validate-user-document';

export class MockValidateUserDocument implements ValidateUserDocument {
	private delayTime = 1000;

	private validDocuments: Record<string, string[]> = {
		'123456789': ['1', '2'],
		'987654321': ['3'],
	};

	async run(docNumber: string, tenantId: string): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const validTenantIds = this.validDocuments[docNumber];

				if (validTenantIds && validTenantIds.includes(tenantId)) {
					resolve();
				} else {
					reject(new Error('Documento não encontrado.'));
				}
			}, this.delayTime);
		});
	}
}
