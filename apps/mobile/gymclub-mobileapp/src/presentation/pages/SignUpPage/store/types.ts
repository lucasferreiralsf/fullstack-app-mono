import { CompanyModel } from '@/domain/models/company';

export interface SignUpContextType {
	userDocNumber: string | null;
	selectedCompany: CompanyModel | null;
	setSelectedCompany: (company: CompanyModel | null) => void;
	setUserDocNumber: (docNumber: string | null) => void;
}
