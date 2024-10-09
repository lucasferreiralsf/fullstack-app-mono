/* eslint-disable max-classes-per-file */
import { HttpClient } from '@/data/interfaces/http/http-client';

import { SignOut } from '@/domain/usecases/signout';

import { UnauthorizedHttpClientDecorator } from './unauthorized-http-client';

const makeHttpClient = (): HttpClient => {
	class TestHttpClient implements HttpClient {
		async request<R>() {
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

const makeSignOut = (): SignOut => {
	class TestSignOut implements SignOut {
		async run() {}
	}

	return new TestSignOut();
};

const makeSut = () => {
	const httpClient = makeHttpClient();
	const signOut = makeSignOut();
	const callback = jest.fn();
	const sut = new UnauthorizedHttpClientDecorator(
		httpClient,
		signOut,
		callback,
	);
	return {
		sut,
		httpClient,
		signOut,
		callback,
	};
};

describe('UnauthorizedHttpClient', () => {
	test('Should call SignOut if HttpClient returns 401', async () => {
		const { sut, httpClient, callback, signOut } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
			statusCode: 401,
			body: {
				message: 'any_message',
			},
		});
		const signOutRunSpy = jest.spyOn(signOut, 'run');

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
		expect(callback).toHaveBeenCalled();
		expect(signOutRunSpy).toHaveBeenCalled();
	});

	test('Should not call SignOut if HttpClient returns 200', async () => {
		const { sut, callback } = makeSut();

		await sut.request({
			body: {},
			url: 'any_url',
			method: 'get',
		});

		expect(callback).not.toHaveBeenCalled();
	});
});
