import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';
import { DefaultGetAvailablePlans } from '@/data/usecases/get-available-plans/default';

import { MembershipPlan } from '@/domain/models/membership-plan';

const apiResponse = [
	{
		id: '1',
		price: '26',
		name: 'Prata',
		sku: 'silver-plan',
		description:
			'Um plano básico, focado no essencial para quem está começando ou quer acesso às funcionalidades principais.',
	},
	{
		id: '2',
		price: '35',
		name: 'Ouro',
		sku: 'gold-plan',
		description:
			'Um plano intermediário, que oferece mais recursos e suporte para quem quer melhorar seu desempenho.',
	},
];

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = MembershipPlan[] | null>(): Promise<HttpResponse<R>> {
			const response = {
				body: apiResponse,
				statusCode: HttpStatusCode.ok,
			};

			return response as HttpResponse<R>;
		}
	}

	return new FakeHttpClient();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const sut = new DefaultGetAvailablePlans(httpClient);
	return { sut, httpClient };
};

describe('DefaultGetAvailablePlans', () => {
	describe('run method tests', () => {
		test('Should call HttpClient with correct URL and method', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.run();

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'get',
				url: '/plans',
			});
		});

		test('Should return the plans when response status is 200', async () => {
			const { sut } = makeSut();

			const plans = await sut.run();

			expect(plans).toEqual(apiResponse);
		});

		test('Should return an empty array when response status is 204', async () => {
			const { sut, httpClient } = makeSut();

			jest.spyOn(httpClient, 'request').mockResolvedValue({
				statusCode: HttpStatusCode.noContent,
				body: [] as MembershipPlan[],
			});

			const plans = await sut.run();
			expect(plans).toEqual([]);
		});

		test('Should sort plans by price in ascending order', async () => {
			const { sut, httpClient } = makeSut();

			jest.spyOn(httpClient, 'request').mockResolvedValue({
				statusCode: HttpStatusCode.ok,
				body: [
					{
						id: '1',
						price: '35',
						name: 'Ouro',
						sku: 'gold-plan',
						description:
							'Um plano intermediário, que oferece mais recursos e suporte para quem quer melhorar seu desempenho.',
					},
					{
						id: '2',
						price: '26',
						name: 'Prata',
						sku: 'silver-plan',
						description:
							'Um plano básico, focado no essencial para quem está começando ou quer acesso às funcionalidades principais.',
					},
				],
			});

			const plans = await sut.run();
			expect(plans).toEqual([
				{
					id: '2',
					price: '26',
					name: 'Prata',
					sku: 'silver-plan',
					description:
						'Um plano básico, focado no essencial para quem está começando ou quer acesso às funcionalidades principais.',
				},
				{
					id: '1',
					price: '35',
					name: 'Ouro',
					sku: 'gold-plan',
					description:
						'Um plano intermediário, que oferece mais recursos e suporte para quem quer melhorar seu desempenho.',
				},
			]);
		});
	});
});
