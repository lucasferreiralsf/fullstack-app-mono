import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultResetPassword } from './default';

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
	const sut = new DefaultResetPassword(httpClient);
	return { sut, httpClient };
};

describe('DefaultResetPassword', () => {
	test('Should call HttpClient with correct URL, method, and body', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_token', 'any_email@example.com', 'new_password');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'post',
			url: '/auth/password-reset/change',
			body: {
				token: 'any_token',
				email: 'any_email@example.com',
				password: 'new_password',
			},
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut } = makeSut();

		const result = sut.run(
			'any_token',
			'any_email@example.com',
			'new_password',
		);

		await expect(result).resolves.toBeUndefined();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run(
			'any_token',
			'any_email@example.com',
			'new_password',
		);

		await expect(promise).rejects.toThrow('Network Error');
	});
});
