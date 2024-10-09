import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { CompanyModel } from '@/domain/models/company';

import { DefaultGetCompanies } from './default';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = CompanyModel[]>(): Promise<HttpResponse<R>> {
			const response = {
				body: [
					{
						name: 'any_company',
						countryName: 'any_country',
						tenantId: 'any_tenant',
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
	const sut = new DefaultGetCompanies(httpClient);
	return { sut, httpClient };
};

describe('DefaultGetCompanies', () => {
	test('Should call HttpClient with correct URL, method, and params', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		// With search param
		await sut.run('any_search_term');
		expect(requestSpy).toHaveBeenCalledWith({
			method: 'get',
			url: '/companies',
			params: { search: 'any_search_term' },
		});

		// With no search param
		await sut.run();
		expect(requestSpy).toHaveBeenCalledWith({
			method: 'get',
			url: '/companies',
			params: {},
		});
	});

	test('Should return empty list when response status is 204', async () => {
		const { sut, httpClient } = makeSut();

		jest.spyOn(httpClient, 'request').mockResolvedValue({
			statusCode: HttpStatusCode.noContent,
			body: [],
		});

		const companies = await sut.run();

		expect(companies).toEqual([]);
	});

	test('Should return the company list when response status is 200', async () => {
		const { sut } = makeSut();

		const companies = await sut.run();

		expect(companies).toEqual([
			{
				name: 'any_company',
				countryName: 'any_country',
				tenantId: 'any_tenant',
			},
		]);
	});

	test('Should throw an error if HttpClient throws', async () => {
		const { sut, httpClient } = makeSut();
		jest
			.spyOn(httpClient, 'request')
			.mockRejectedValueOnce(new Error('Network Error'));

		const promise = sut.run();

		await expect(promise).rejects.toThrow(new Error('Network Error'));
	});
});
