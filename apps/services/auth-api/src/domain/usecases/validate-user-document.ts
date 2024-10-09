import { Usecase } from '@gymclub/utils';
import { OnboardingService } from '../../data/onboarding/onboarding-service';

export class ValidateUserDocument implements Usecase<Params, void> {
	constructor(private readonly onboardingService: OnboardingService) {}

	async invoke(params: Params): Promise<void> {
		await this.onboardingService.validateUserDocument(
			params.docNumber,
			params.tenantId,
		);
	}
}

interface Params {
	docNumber: string;
	tenantId: string;
}
