import axios from 'axios';

import * as httpHelpers from '@/data/helpers/http-helpers';
import { HttpMethod } from '@/data/interfaces/http/http-client';

import { AxiosHttpClient } from './axios-http-client';

const makeRequestSpy = () => jest.spyOn(axios, 'request');
const makeHandleHttpResponseSpy = () =>
	jest.spyOn(httpHelpers, 'handleHttpResponse');
const makeSut = () => new AxiosHttpClient(axios);

describe('AxiosHttpClient', () => {
	test('should call axios with correct values', async () => {
		const sut = makeSut();
		const requestSpy = makeRequestSpy();

		requestSpy.mockResolvedValue({
			data: [],
			status: 200,
		});

		await sut.request({
			method: 'get',
			url: 'any_url',
		});

		expect(requestSpy).toHaveBeenCalledWith({
			method: 'get',
			url: 'any_url',
			headers: undefined,
			data: undefined,
		});
	});

	test('Should return correct response', async () => {
		const sut = makeSut();
		const requestSpy = makeRequestSpy();
		const handleHttpResponseSpy = makeHandleHttpResponseSpy();
		handleHttpResponseSpy.mockImplementationOnce((response) => response);
		requestSpy.mockImplementationOnce(() =>
			Promise.resolve({
				data: [],
				status: 201,
			}),
		);

		const httpRequest = {
			url: 'any_url',
			method: 'post' as HttpMethod,
			body: 'any_body',
		};

		const result = await sut.request(httpRequest);
		expect(handleHttpResponseSpy).toHaveBeenCalledWith({
			statusCode: 201,
			body: [],
		});
		expect(result).toEqual({
			body: [],
			statusCode: 201,
		});
	});

	test('Should return undefined body if response is empty', async () => {
		const sut = makeSut();
		const requestSpy = makeRequestSpy();
		requestSpy.mockResolvedValue(undefined);
		const handleHttpResponseSpy = makeHandleHttpResponseSpy();
		handleHttpResponseSpy.mockImplementationOnce((response) => response);

		await sut.request({
			url: 'any_url',
			method: 'get',
		});

		expect(handleHttpResponseSpy).toHaveBeenCalledWith({
			body: undefined,
			statusCode: undefined,
		});
	});

	test('Should throw if request throws', async () => {
		const sut = makeSut();
		const requestSpy = makeRequestSpy();
		requestSpy.mockRejectedValueOnce({
			response: {
				status: 500,
				body: {
					message: 'any_message',
				},
			},
		});

		const httpRequest = {
			url: 'any_url',
			method: 'post' as HttpMethod,
			body: 'any_body',
		};

		const promise = sut.request(httpRequest);
		expect(promise).rejects.toThrow();
	});
});
