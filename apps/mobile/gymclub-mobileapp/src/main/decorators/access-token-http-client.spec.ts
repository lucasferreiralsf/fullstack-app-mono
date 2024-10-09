/* eslint-disable max-classes-per-file */
import { DataStorage } from '@/data/interfaces/data-storage';
import { HttpClient, HttpResponse } from '@/data/interfaces/http/http-client';

import { AccessTokenHttpClientDecorator } from './access-token-http-client';

const makeHttpClient = (): HttpClient => {
	class TestHttpClient implements HttpClient {
		async request<R>(): Promise<HttpResponse<R>> {
			return {
				statusCode: 200,
				body: {
					message: 'any_message',
				} as R,
			};
		}
	}

	return new TestHttpClient();
};

const makeDataStorage = () => {
	class TestDataStorage implements DataStorage {
		async get(): Promise<string | null> {
			return 'any_session_id';
		}

		async set() {}

		async delete() {}
	}

	return new TestDataStorage();
};

const makeSut = () => {
	const httpClient = makeHttpClient();
	const dataStorage = makeDataStorage();
	const sut = new AccessTokenHttpClientDecorator(httpClient, dataStorage);
	return {
		sut,
		httpClient,
		dataStorage,
	};
};

describe('AccessTokenHttpClient', () => {
	test('Should call HttpClient with correct values, appending authorization header', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.request({
			body: {},
			url: 'any_url',
			method: 'get',
		});

		expect(requestSpy).toHaveBeenCalledWith({
			body: {},
			url: 'any_url',
			method: 'get',
			headers: {
				Authorization: 'Bearer any_session_id',
			},
		});
	});

	test('Should call HttpClient with correct values, without authorization header', async () => {
		const { sut, httpClient, dataStorage } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');
		jest.spyOn(dataStorage, 'get').mockResolvedValueOnce(null);

		await sut.request({
			body: {},
			url: 'any_url',
			method: 'get',
		});

		expect(requestSpy).toHaveBeenCalledWith({
			body: {},
			url: 'any_url',
			method: 'get',
		});
	});

	test('Should call DataStorage.get with correct values', async () => {
		const { sut, dataStorage } = makeSut();
		const getSpy = jest.spyOn(dataStorage, 'get');

		await sut.request({
			body: {},
			url: 'any_url',
			method: 'get',
		});

		expect(getSpy).toHaveBeenCalledWith('session-id');
	});
});
