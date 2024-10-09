import { DataStorage } from '@/data/interfaces/data-storage';
import {
	HttpClient,
	HttpRequest,
	HttpResponse,
} from '@/data/interfaces/http/http-client';

export class AccessTokenHttpClientDecorator implements HttpClient {
	constructor(
		private readonly httpClient: HttpClient,
		private readonly secureStorage: DataStorage,
	) {}

	async request<R = unknown>(request: HttpRequest): Promise<HttpResponse<R>> {
		const sessionId = await this.secureStorage.get('session-id');
		if (sessionId) {
			if (!request.headers) request.headers = {};
			request.headers.Authorization = `Bearer ${sessionId}`;
		}
		return this.httpClient.request(request);
	}
}
