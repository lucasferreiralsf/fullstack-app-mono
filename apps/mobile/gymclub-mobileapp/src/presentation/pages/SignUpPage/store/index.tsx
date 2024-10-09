import React, { createContext, ReactNode, useState } from 'react';

import { CompanyModel } from '@/domain/models/company';

import { SignUpContextType } from './types';

const initialState: SignUpContextType = {
	userDocNumber: null,
	selectedCompany: null,
	setSelectedCompany: () => {},
	setUserDocNumber: () => {},
};

export const SignUpContext = createContext<SignUpContextType>(initialState);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
	const [selectedCompany, setSelectedCompany] = useState<CompanyModel | null>(
		initialState.selectedCompany,
	);
	const [userDocNumber, setUserDocNumber] = useState<string | null>(
		initialState.userDocNumber,
	);

	return (
		<SignUpContext.Provider
			value={{
				selectedCompany,
				setSelectedCompany,
				userDocNumber,
				setUserDocNumber,
			}}
		>
			{children}
		</SignUpContext.Provider>
	);
};
