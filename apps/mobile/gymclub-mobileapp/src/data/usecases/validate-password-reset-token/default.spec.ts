import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultValidatePasswordResetToken } from './default';

class MockHttpClient implements HttpClient {
	async request<R>(): Promise<HttpResponse<R>> {
		return {
			statusCode: HttpStatusCode.ok,
			body: {} as R,
		};
	}
}

const makeSut = () => {
	const httpClient = new MockHttpClient();
	const sut = new DefaultValidatePasswordResetToken(httpClient);
	return { sut, httpClient };
};

describe('DefaultValidatePasswordResetToken', () => {
	test('Should call HttpClient with correct URL and method', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_token', 'any_email@example.com');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'post',
			url: '/auth/password-reset/validate-code',
			body: { token: 'any_token', email: 'any_email@example.com' },
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut, httpClient } = makeSut();
		const handleHttpResponseSpy = jest
			.spyOn(httpClient, 'request')
			.mockResolvedValueOnce({
				statusCode: HttpStatusCode.ok,
				body: {},
			});

		const result = sut.run('any_token', 'any_email@example.com');

		await expect(result).resolves.toBeUndefined();
		expect(handleHttpResponseSpy).toHaveBeenCalled();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run('any_token', 'any_email@example.com');

		await expect(promise).rejects.toThrow('Network Error');
	});
});
