import { CheckInHistoryModel } from '../models/checkin-history';

export interface LoadCheckInHistory {
	loadHistory: () => Promise<CheckInHistoryModel[]>;
}
