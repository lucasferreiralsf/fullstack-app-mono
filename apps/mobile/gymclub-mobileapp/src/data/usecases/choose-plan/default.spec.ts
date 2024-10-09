import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultChoosePlan } from './default';

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
	const sut = new DefaultChoosePlan(httpClient);
	return { sut, httpClient };
};

describe('DefaultChoosePlan', () => {
	test('Should call HttpClient with correct URL, method, and body', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_plan_id');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'patch',
			url: '/users/plan',
			body: { planId: 'any_plan_id' },
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
			statusCode: HttpStatusCode.ok,
			body: {
				clientSecret: '123',
			},
		});

		const result = await sut.run('any_plan_id');

		expect(result).toEqual({ clientSecret: '123' });
		expect(requestSpy).toHaveBeenCalled();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run('any_plan_id');

		await expect(promise).rejects.toThrow('Network Error');
	});
});
