import { MockLoadCheckInHistory } from '@/data/usecases/load-checkin-history/mock';

import CheckInHistoryPage from '@/presentation/pages/CheckInHistoryPage';

export function MakeCheckInHistoryPage(): React.JSX.Element {
	const mockLoadCheckInHistory = new MockLoadCheckInHistory();

	return <CheckInHistoryPage loadCheckInHistory={mockLoadCheckInHistory} />;
}
