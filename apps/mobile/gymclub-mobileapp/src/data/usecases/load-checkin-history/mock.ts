import { CheckInHistoryModel } from '@/domain/models/checkin-history';
import { LoadCheckInHistory } from '@/domain/usecases/load-checkin-history';

export class MockLoadCheckInHistory implements LoadCheckInHistory {
	loadHistory(): Promise<CheckInHistoryModel[]> {
		return Promise.resolve([
			{
				name: 'Armazém do Fitness',
				date: '2024-12-03',
			},
			{
				name: 'Fitness UP',
				date: '2024-12-02',
			},
			{
				name: 'Armazém do Fitness com nome mais longoaaaaaaaaaa',
				date: '2024-12-01',
			},
		]);
	}
}
