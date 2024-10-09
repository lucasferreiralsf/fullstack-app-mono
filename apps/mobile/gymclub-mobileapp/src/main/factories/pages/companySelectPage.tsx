import { DefaultGetCompanies } from '@/data/usecases/get-companies/default';
import { DefaultValidateUserDocument } from '@/data/usecases/validate-user-document/default';

import CompanySelectPage from '@/presentation/pages/SignUpPage/pages/CompanySelectPage';

import { makeHttpClient } from '../http/http-client';

export function MakeCompanySelectPage(): React.JSX.Element {
	const httpClient = makeHttpClient();
	const getCompanies = new DefaultGetCompanies(httpClient);
	const validateUserDocument = new DefaultValidateUserDocument(httpClient);

	return (
		<CompanySelectPage
			validateUserDocument={validateUserDocument}
			getCompanies={getCompanies}
		/>
	);
}
