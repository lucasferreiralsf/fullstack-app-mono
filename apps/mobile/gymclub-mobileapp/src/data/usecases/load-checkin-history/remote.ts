import { HttpClient } from '@/data/interfaces/http/http-client';

import { CheckInHistoryModel } from '@/domain/models/checkin-history';
import { LoadCheckInHistory } from '@/domain/usecases/load-checkin-history';

export class RemoteLoadCheckInHistory implements LoadCheckInHistory {
	constructor(private readonly client: HttpClient) {}

	async loadHistory(): Promise<CheckInHistoryModel[]> {
		const response = await this.client.request<RemoteLoadCheckInHistoryDto[]>({
			method: 'get',
			url: 'get-checkin-history-url',
		});

		return response.body;
	}
}

export interface RemoteLoadCheckInHistoryDto {
	name: string;
	date: string;
}
