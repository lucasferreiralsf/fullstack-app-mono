import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultRequestEmailVerificationCode } from './default';

class MockHttpClient implements HttpClient {
	async request<R>(): Promise<HttpResponse<R>> {
		return {
			statusCode: HttpStatusCode.ok,
			body: null as R,
		};
	}
}

const makeSut = () => {
	const httpClient = new MockHttpClient();
	const sut = new DefaultRequestEmailVerificationCode(httpClient);
	return { sut, httpClient };
};

describe('DefaultRequestEmailVerificationCode', () => {
	test('Should call HttpClient with correct URL and method', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_email');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'post',
			url: '/auth/email-verification/request',
			body: {
				email: 'any_email',
			},
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut, httpClient } = makeSut();
		const handleHttpResponseSpy = jest
			.spyOn(httpClient, 'request')
			.mockResolvedValueOnce({
				statusCode: HttpStatusCode.ok,
				body: null,
			});

		const result = sut.run('any_email');

		await expect(result).resolves.toBeUndefined();
		expect(handleHttpResponseSpy).toHaveBeenCalled();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run('any_email');

		await expect(promise).rejects.toThrow('Network Error');
	});
});
