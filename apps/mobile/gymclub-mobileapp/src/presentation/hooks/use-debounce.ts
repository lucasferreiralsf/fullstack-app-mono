import { useEffect } from 'react';

export function useDebounce(
	effect: () => void,
	delay: number,
	deps: unknown[],
) {
	useEffect(() => {
		const handler = setTimeout(() => void effect(), delay);

		return () => void clearTimeout(handler);
	}, [...deps, delay]);
}
