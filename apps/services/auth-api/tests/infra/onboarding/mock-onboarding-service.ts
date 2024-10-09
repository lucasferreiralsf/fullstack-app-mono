import { OnboardingService } from '../../../src/data/onboarding/onboarding-service';

export class MockOnboardingService implements OnboardingService {
	async validateUserDocument(
		docNumber: string,
		companyId: string,
	): Promise<void> {}
}
