import { DocumentNotFoundError } from '@gymclub/auth-api/utils/custom-errors';
import { CompanyEmployeeRepository } from '../../data/company-employee/company-employee-repository';
import { OnboardingService } from '../../data/onboarding/onboarding-service';

export class DefaultOnboardingService implements OnboardingService {
	constructor(
		private readonly companyEmployeeRepository: CompanyEmployeeRepository,
	) {}

	async validateUserDocument(
		docNumber: string,
		tenantId: string,
	): Promise<void> {
		const record = await this.companyEmployeeRepository.findByDocumentAndTenant(
			docNumber,
			tenantId,
		);
		if (!record) {
			throw new DocumentNotFoundError();
		}
	}
}
