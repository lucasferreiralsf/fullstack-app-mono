import {
	HttpClient,
	HttpRequest,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { SignOut } from '@/domain/usecases/signout';

export class UnauthorizedHttpClientDecorator implements HttpClient {
	constructor(
		private readonly httpClient: HttpClient,
		private readonly signOut: SignOut,
		private readonly signOutCallback: () => Promise<void>,
	) {}

	async request<R = unknown>(request: HttpRequest): Promise<HttpResponse<R>> {
		const response = await this.httpClient.request<R>(request);
		if (response.statusCode === HttpStatusCode.unauthorized) {
			await this.signOut.run();
			this.signOutCallback();
		}
		return response;
	}
}
