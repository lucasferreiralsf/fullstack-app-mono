import { GetCompanies } from '@/domain/usecases/get-companies';
import { ValidateUserDocument } from '@/domain/usecases/validate-user-document';

export interface CompanySelectPageProps {
	getCompanies: GetCompanies;
	validateUserDocument: ValidateUserDocument;
}
