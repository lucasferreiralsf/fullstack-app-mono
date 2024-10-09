import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { CheckInHistoryModel } from '@/domain/models/checkin-history';

import { RemoteLoadCheckInHistory } from './remote';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = CheckInHistoryModel[]>(): Promise<HttpResponse<R>> {
			const response = {
				body: [
					{
						name: 'any_name',
						date: 'any_date',
					},
				],
				statusCode: HttpStatusCode.ok,
			};

			return response as HttpResponse<R>;
		}
	}

	return new FakeHttpClient();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const sut = new RemoteLoadCheckInHistory(httpClient);
	return { sut, httpClient };
};

describe('RemoteLoadCheckInHistory', () => {
	describe('loadHistory method tests', () => {
		test('Should call HttpClient with correct URL and method', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.loadHistory();

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'get',
				url: 'get-checkin-history-url',
			});
		});

		test('Should return the checkin history list when response status is 200', async () => {
			const { sut } = makeSut();

			const checkInHistory = await sut.loadHistory();

			expect(checkInHistory).toEqual([
				{
					name: 'any_name',
					date: 'any_date',
				},
			]);
		});

		test('Should return empty list when response status is 204', async () => {
			const { sut, httpClient } = makeSut();

			jest.spyOn(httpClient, 'request').mockResolvedValue({
				statusCode: HttpStatusCode.noContent,
				body: [],
			});

			const checkInHistory = await sut.loadHistory();

			expect(checkInHistory).toEqual([]);
		});
	});
});
