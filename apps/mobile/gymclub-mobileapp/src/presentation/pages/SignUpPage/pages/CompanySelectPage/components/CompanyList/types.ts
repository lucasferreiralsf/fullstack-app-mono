import { CompanyModel } from '@/domain/models/company';

export interface CompanyListProps {
	companies: CompanyModel[];
	noResults: boolean;
	selectCompany: (company: CompanyModel) => void;
}
