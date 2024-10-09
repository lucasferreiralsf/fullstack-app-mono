import { ValidateUserDocument } from '../../domain/usecases/validate-user-document';
import { dbClient } from '../../infra/clients';
import { DrizzleCompanyEmployeeRepository } from '../../infra/company-employee/drizzle-company-employee-repository';
import { DefaultOnboardingService } from '../../infra/onboarding/default-onboarding-service';

export const makeValidateUserDocument = () => {
	const companyEmployeeRepository = new DrizzleCompanyEmployeeRepository(
		dbClient,
	);
	const onboardingService = new DefaultOnboardingService(
		companyEmployeeRepository,
	);

	return new ValidateUserDocument(onboardingService);
};
