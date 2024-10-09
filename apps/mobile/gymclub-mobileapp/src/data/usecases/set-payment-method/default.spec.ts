import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultSetPaymentMethod } from './default';

class MockHttpClient implements HttpClient {
	async request<R>(): Promise<HttpResponse<R>> {
		return {
			statusCode: HttpStatusCode.ok,
			body: undefined as R,
		};
	}
}

const makeSut = () => {
	const httpClient = new MockHttpClient();
	const sut = new DefaultSetPaymentMethod(httpClient);
	return { sut, httpClient };
};

describe('DefaultSetPaymentMethod', () => {
	test('Should call HttpClient with correct URL, method, and body', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run();

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'post',
			url: '/users/payment-method',
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut } = makeSut();
		const result = sut.run();
		await expect(result).resolves.toBeUndefined();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run();

		await expect(promise).rejects.toThrow('Network Error');
	});
});
