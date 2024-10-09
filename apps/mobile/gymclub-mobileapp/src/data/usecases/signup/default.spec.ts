/* eslint-disable max-classes-per-file */
import { DataStorage } from '@/data/interfaces/data-storage';
import {
	HttpClient,
	HttpResponse,
	HttpStatusCode,
} from '@/data/interfaces/http/http-client';
import { RemoteSignUp } from '@/data/usecases/signup/default';

const signUpPayload = {
	firstName: 'any_first_name',
	lastName: 'any_last_name',
	email: 'any_email@mail.com',
	password: 'any_password',
	companyId: 'any_company_id',
};

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

const makeDataStorage = () => {
	class TestDataStorage implements DataStorage {
		async get(): Promise<string | null> {
			return 'any_session_id';
		}

		async set() {}

		async delete() {}
	}

	return new TestDataStorage();
};

const makeSut = () => {
	const httpClient = makeFakeHttpClient();
	const secureStorage = makeDataStorage();
	const sut = new RemoteSignUp(httpClient, secureStorage);
	return { sut, httpClient, secureStorage };
};

describe('RemoteSignUp', () => {
	describe('run method tests', () => {
		test('Should call HttpClient with correct URL, method and body', async () => {
			const { sut, httpClient } = makeSut();
			const requestSpy = jest.spyOn(httpClient, 'request');

			await sut.run(signUpPayload);

			expect(requestSpy).toHaveBeenCalledWith({
				method: 'post',
				url: '/auth/signup',
				body: signUpPayload,
			});
		});

		test('Should call secureStorage set method with correct values', async () => {
			const { sut, secureStorage } = makeSut();
			const setSpy = jest.spyOn(secureStorage, 'set');

			await sut.run(signUpPayload);

			expect(setSpy).toHaveBeenCalledWith('session-id', 'some_value');
		});

		test('Should create and return the user info when response status is 201', async () => {
			const { sut } = makeSut();

			const response = await sut.run(signUpPayload);

			expect(response).toEqual({
				message: 'any_message',
			});
		});
	});
});
