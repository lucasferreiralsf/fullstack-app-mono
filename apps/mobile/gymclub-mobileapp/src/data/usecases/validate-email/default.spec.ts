import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultValidateEmail } from './default';

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
	const sut = new DefaultValidateEmail(httpClient);
	return { sut, httpClient };
};

describe('DefaultValidateEmail', () => {
	test('Should call HttpClient with correct URL, method, and body', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_code', 'any_email@mail.com');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'post',
			url: '/auth/email-verification/validate-code',
			body: { code: 'any_code', email: 'any_email@mail.com' },
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
			statusCode: HttpStatusCode.ok,
			body: null,
		});

		const result = sut.run('any_code', 'any_email@mail.com');

		await expect(result).resolves.toBeUndefined();
		expect(requestSpy).toHaveBeenCalled();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run('any_code', 'any_email@mail.com');

		await expect(promise).rejects.toThrow('Network Error');
	});
});
