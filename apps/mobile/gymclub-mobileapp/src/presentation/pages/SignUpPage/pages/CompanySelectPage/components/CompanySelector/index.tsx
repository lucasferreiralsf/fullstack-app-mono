import { useCallback, useContext, useState } from 'react';

import { CompanyModel } from '@/domain/models/company';

import { SearchIcon } from '@/presentation/components/icons';
import TextInput from '@/presentation/components/TextInput';
import { useDebounce } from '@/presentation/hooks/use-debounce';
import { SignUpContext } from '@/presentation/pages/SignUpPage/store';
import { colors } from '@/presentation/styles/colors';

import CompanyItem from '../CompanyItem';
import CompanyList from '../CompanyList';
import CompanyListSkeleton from '../CompanyListSkeleton';
import { CompanySelectorProps } from './types';

export default function CompanySelector({
	getCompanies,
}: CompanySelectorProps) {
	const DEBOUNCE_TIME = 600;
	const MIN_SEARCH_LENGTH = 2;

	const { selectedCompany, setSelectedCompany } = useContext(SignUpContext);
	const [companyName, setCompanyName] = useState('');
	const [companies, setCompanies] = useState<CompanyModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);

	const {
		gymclub: { gray },
	} = colors;

	const fetchCompanies = useCallback(async () => {
		if (companyName.length < MIN_SEARCH_LENGTH) {
			setCompanies([]);
			setNoResults(false);
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			setNoResults(false);

			const response = await getCompanies.run(companyName);

			setCompanies(response);
			setNoResults(response.length === 0);
		} catch {
			setNoResults(true);
		} finally {
			setIsLoading(false);
		}
	}, [companyName, getCompanies]);

	const onClosePress = () => {
		setSelectedCompany(null);
		setCompanyName('');
		setCompanies([]);
	};

	useDebounce(fetchCompanies, DEBOUNCE_TIME, [companyName]);

	return selectedCompany ? (
		<CompanyItem
			className="mb-6"
			isSelected={true}
			onClosePress={onClosePress}
			company={selectedCompany}
		/>
	) : (
		<>
			<TextInput
				className="mb-6"
				placeholder="Buscar"
				label="Nome da empresa"
				value={companyName}
				onChangeText={setCompanyName}
				icon={<SearchIcon className="h-7 w-7" color={gray[300]} />}
			/>

			{isLoading ? (
				<CompanyListSkeleton />
			) : (
				<CompanyList
					noResults={noResults}
					companies={companies}
					selectCompany={setSelectedCompany}
				/>
			)}
		</>
	);
}
