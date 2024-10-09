export interface ValidateUserDocument {
	run: (docNumber: string, companyId: string) => Promise<void>;
}
