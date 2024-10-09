import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';
import { DefaultGetUserSubscription } from '@/data/usecases/get-user-subscription/default';

import { SubscriptionStatus } from '@/domain/models/enums/subscription-status';
import { SubscriptionModel } from '@/domain/models/subscription';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = SubscriptionModel | null>(): Promise<HttpResponse<R>> {
			const response = {
				body: {
					status: SubscriptionStatus.ACTIVE,
					id: 'any_id',
					planId: 'any_plan_id',
					athleteProfileId: 'any_athlete_profile_id',
					providerSubscriptionId: 'any_provider_subscription_id',
					startDate: new Date('2024-01-01'),
					endDate: new Date('2024-12-31'),
				},
				statusCode: HttpStatusCode.ok,
			};

			return response as HttpResponse<R>;
		}
	}

	return new FakeHttpClient();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const sut = new DefaultGetUserSubscription(httpClient);
	return { sut, httpClient };
};

describe('DefaultGetUserSubscription', () => {
	describe('run method tests', () => {
		test('Should call HttpClient with correct URL and method', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.run();

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'get',
				url: '/users/subscription',
			});
		});

		test('Should return the subscription info when response status is 200', async () => {
			const { sut } = makeSut();

			const subscription = await sut.run();

			expect(subscription).toEqual({
				status: SubscriptionStatus.ACTIVE,
				id: 'any_id',
				planId: 'any_plan_id',
				athleteProfileId: 'any_athlete_profile_id',
				providerSubscriptionId: 'any_provider_subscription_id',
				startDate: new Date('2024-01-01'),
				endDate: new Date('2024-12-31'),
			});
		});

		test('Should return null when an exception is thrown', async () => {
			const { sut, httpClient } = makeSut();
			jest.spyOn(httpClient, 'request').mockImplementationOnce(() => {
				throw new Error();
			});

			const subscription = await sut.run();

			expect(subscription).toBeNull();
		});

		test('Should return null when response status is not 200', async () => {
			const httpClient = {
				async request<R = SubscriptionModel | null>(): Promise<
					HttpResponse<R>
				> {
					return {
						body: null,
						statusCode: HttpStatusCode.notFound,
					} as HttpResponse<R>;
				},
			};
			const sut = new DefaultGetUserSubscription(httpClient);

			const subscription = await sut.run();

			expect(subscription).toBeNull();
		});
	});
});
