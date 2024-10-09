import { useCallback, useState } from 'react';

export function useErrorHandling(
	defaultErrorMessage = 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.',
) {
	const [errorMessage, setErrorMessage] = useState('');

	const setDefaultError = useCallback(() => {
		setErrorMessage(defaultErrorMessage);
	}, [defaultErrorMessage]);

	const handleError = useCallback(
		(error: unknown) => {
			if (error instanceof Error && error.message) {
				setErrorMessage(error.message);
			} else {
				setDefaultError();
			}
		},
		[setDefaultError],
	);

	return { errorMessage, handleError, setErrorMessage };
}
