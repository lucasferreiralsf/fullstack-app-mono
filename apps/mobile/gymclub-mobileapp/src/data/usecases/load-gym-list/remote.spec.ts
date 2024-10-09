import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';

import { GymModel } from '@/domain/models/gym';

import { RemoteLoadGymList } from './remote';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = GymModel[]>(): Promise<HttpResponse<R>> {
			const response = {
				body: [
					{
						picture: 'any_picture',
						name: 'any_name',
						address: {
							city: 'any_city',
							countryCode: 'any_country',
							addressId: 1,
						},
						category: {
							name: 'any_category',
							categoryId: 1,
						},
						distance: 1,
						isOpen: true,
						closingTime: 'any_hour',
						rating: 1,
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
	const sut = new RemoteLoadGymList('any_url', httpClient);
	return { sut, httpClient };
};

describe('RemoteLoadGymList', () => {
	test('Should call HttpClient with correct URL and method', async () => {
		const { sut, httpClient } = makeSut();
		const requestSpy = jest.spyOn(httpClient, 'request');

		await sut.loadGyms();

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'get',
			url: 'any_url',
		});
	});

	test('Should return empty list when response status is 204', async () => {
		const { sut, httpClient } = makeSut();

		jest.spyOn(httpClient, 'request').mockResolvedValue({
			statusCode: HttpStatusCode.noContent,
			body: [],
		});

		const gyms = await sut.loadGyms();

		expect(gyms).toEqual([]);
	});

	test('Should return the gym list when response status is 200', async () => {
		const { sut } = makeSut();

		const gyms = await sut.loadGyms();

		expect(gyms).toEqual([
			{
				picture: 'any_picture',
				name: 'any_name',
				address: {
					city: 'any_city',
					countryCode: 'any_country',
					addressId: 1,
				},
				category: {
					name: 'any_category',
					categoryId: 1,
				},
				distance: 1,
				isOpen: true,
				closingTime: 'any_hour',
				rating: 1,
			},
		]);
	});
});
