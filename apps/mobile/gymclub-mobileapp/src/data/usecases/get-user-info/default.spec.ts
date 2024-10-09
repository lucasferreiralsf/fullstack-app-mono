import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';
import { DefaultGetUserInfo } from '@/data/usecases/get-user-info/default';

import { UserModel } from '@/domain/models/user';

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<R = UserModel | null>(): Promise<HttpResponse<R>> {
			const response = {
				body: {
					id: 'any_id',
					firstName: 'any_first_name',
					lastName: 'any_last_name',
					emailVerified: true,
					email: 'any_email',
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
	const sut = new DefaultGetUserInfo(httpClient);
	return { sut, httpClient };
};

describe('DefaultGetUserInfo', () => {
	describe('run method tests', () => {
		test('Should call HttpClient with correct URL and method', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.run();

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'get',
				url: '/users/profile',
			});
		});

		test('Should return the user info when response status is 200', async () => {
			const { sut } = makeSut();

			const user = await sut.run();

			expect(user).toEqual({
				id: 'any_id',
				firstName: 'any_first_name',
				lastName: 'any_last_name',
				emailVerified: true,
				email: 'any_email',
			});
		});
	});
});
