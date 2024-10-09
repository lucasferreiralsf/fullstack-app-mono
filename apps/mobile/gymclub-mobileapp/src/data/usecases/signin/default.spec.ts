/* eslint-disable max-classes-per-file */
import { DataStorage } from '@/data/interfaces/data-storage';
import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';
import { DefaultSignIn } from '@/data/usecases/signin/default';

const signinPayload = { email: 'any_email@mail.com', password: 'any_password' };

const makeFakeHttpClient = () => {
	class FakeHttpClient implements HttpClient {
		async request<T>(): Promise<HttpResponse<T>> {
			const response = {
				body: {
					message: 'any_message',
					sessionId: 'some_value',
				},
				statusCode: HttpStatusCode.ok,
			};

			return response as HttpResponse<T>;
		}
	}

	return new FakeHttpClient();
};

const makeFakeSecureStore = (): DataStorage => {
	class FakeSecureStore implements DataStorage {
		async get(key: string): Promise<string | null> {
			return 'some_value';
		}

		async set(key: string, value: string): Promise<void> {}

		async delete(key: string): Promise<void> {}
	}
	return new FakeSecureStore();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const secureStore = makeFakeSecureStore();
	const sut = new DefaultSignIn(httpClient, secureStore);
	return { sut, httpClient, secureStore };
};

describe('DefaultSignIn', () => {
	describe('run method tests', () => {
		test('Should call HttpClient with correct URL, method and body', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.run(signinPayload.email, signinPayload.password);

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'post',
				url: '/auth/signin',
				body: signinPayload,
			});
		});

		test('Should call secureStore set method with correct values', async () => {
			const { sut, secureStore } = makeSut();
			const setSpy = jest.spyOn(secureStore, 'set');

			await sut.run(signinPayload.email, signinPayload.password);

			expect(setSpy).toHaveBeenCalledWith('session-id', 'some_value');
		});

		test('Should create and return the user info when response status is 201', async () => {
			const { sut } = makeSut();

			const response = await sut.run(
				signinPayload.email,
				signinPayload.password,
			);

			expect(response).toEqual({
				message: 'any_message',
			});
		});
	});
});
