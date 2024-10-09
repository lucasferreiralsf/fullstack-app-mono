import axios from 'axios';
import { router } from 'expo-router';

import { AUTH_API_URL } from '@/data/constants';
import { HttpClient } from '@/data/interfaces/http/http-client';
import { DefaultSignOut } from '@/data/usecases/signout/default';

import { AccessTokenHttpClientDecorator } from '@/main/decorators/access-token-http-client';
import { UnauthorizedHttpClientDecorator } from '@/main/decorators/unauthorized-http-client';
import { applyDecorators } from '@/main/helpers/decorator-helpers';

import { AxiosHttpClient } from '@/infra/http/axios-http-client';

import { makeSecureStorageAdapter } from '../adapters/secure-storage-adapter';

export const makeHttpClient = (): HttpClient => {
	const axiosInstance = axios.create({
		baseURL: AUTH_API_URL,
	});

	const axiosHttpClient: HttpClient = new AxiosHttpClient(axiosInstance);
	const secureStorage = makeSecureStorageAdapter();
	const signOut = new DefaultSignOut(secureStorage);

	return applyDecorators(axiosHttpClient, [
		(httpClient) =>
			new AccessTokenHttpClientDecorator(httpClient, secureStorage),
		(httpClient) =>
			new UnauthorizedHttpClientDecorator(httpClient, signOut, async () => {
				router.replace('/signin');
			}),
	]);
};
