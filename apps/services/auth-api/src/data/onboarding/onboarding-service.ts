export interface OnboardingService {
	validateUserDocument: (docNumber: string, companyId: string) => Promise<void>;
}
