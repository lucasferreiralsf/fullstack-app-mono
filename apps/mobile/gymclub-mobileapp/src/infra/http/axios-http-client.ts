import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { handleHttpResponse } from '@/data/helpers/http-helpers';
import {
	HttpClient,
	HttpRequest,
	HttpResponse,
} from '@/data/interfaces/http/http-client';

export class AxiosHttpClient implements HttpClient {
	constructor(private readonly axiosInstance: AxiosInstance) {}

	async request<R = unknown>(request: HttpRequest): Promise<HttpResponse<R>> {
		const response = await this.axiosInstance
			.request({
				method: request.method,
				url: request.url,
				data: request.body,
				headers: request.headers,
				params: request.params,
			})
			.catch((error: AxiosError) => error.response as AxiosResponse);

		const httpResponse = {
			statusCode: response?.status,
			body: response?.data,
		};

		return handleHttpResponse(httpResponse) as HttpResponse<R>;
	}
}
