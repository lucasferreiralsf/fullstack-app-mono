import React, { createContext, ReactNode, useState } from 'react';

import { ForgotMyPasswordContextType } from './types';

const initialState: ForgotMyPasswordContextType = {
	userEmail: '',
	verificationCode: '',
	setUserEmail: () => {},
	setVerificationCode: () => {},
};

export const ForgotMyPasswordContext =
	createContext<ForgotMyPasswordContextType>(initialState);

export const ForgotMyPasswordProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [userEmail, setUserEmail] = useState<string>(initialState.userEmail);
	const [verificationCode, setVerificationCode] = useState<string>(
		initialState.verificationCode,
	);

	return (
		<ForgotMyPasswordContext.Provider
			value={{ userEmail, setUserEmail, verificationCode, setVerificationCode }}
		>
			{children}
		</ForgotMyPasswordContext.Provider>
	);
};
