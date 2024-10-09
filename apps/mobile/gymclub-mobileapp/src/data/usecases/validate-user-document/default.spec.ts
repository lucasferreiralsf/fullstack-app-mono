import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { DefaultValidateUserDocument } from './default';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R>(): Promise<HttpResponse<R>> {
			return {
				statusCode: HttpStatusCode.ok,
				body: null as R,
			};
		}
	}

	return new FakeHttpClient();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const sut = new DefaultValidateUserDocument(httpClient);
	return { sut, httpClient };
};

describe('DefaultValidateUserDocument', () => {
	test('Should call HttpClient with correct URL, method, and params', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.run('any_doc_number', 'any_tenant_id');

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'get',
			url: '/companies/any_tenant_id/documents/any_doc_number',
		});
	});

	test('Should handle response correctly when status is 200', async () => {
		const { sut } = makeSut();

		const promise = sut.run('any_doc_number', 'any_tenant_id');

		await expect(promise).resolves.toBeUndefined();
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run('any_doc_number', 'any_tenant_id');

		await expect(promise).rejects.toThrow(new Error('Network Error'));
	});
});
