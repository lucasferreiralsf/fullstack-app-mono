import { InvalidSessionError } from '@gymclub/auth-api/utils/custom-errors';
import { describe, expect, jest, spyOn, test } from 'bun:test';
import { Lucia, Session, User } from 'lucia';
import { UserModel } from '../../../src/domain/models/user';
import { LuciaSessionHandler } from '../../../src/infra/authentication/lucia-session-handler';

const makeSut = () => {
	const luciaClient = {
		createSession: jest.fn(),
		readBearerToken: jest.fn(),
		validateSession: jest.fn(),
	} as unknown as Lucia;

	const sut = new LuciaSessionHandler(luciaClient);

	return {
		sut,
		luciaClient,
	};
};

describe('LuciaSessionHandler', () => {
	describe('createSession', () => {
		test('should create a session and return the session ID', async () => {
			const { sut, luciaClient } = makeSut();
			const mockSession = { id: 'session_id' } as Session;
			spyOn(luciaClient, 'createSession').mockResolvedValueOnce(mockSession);

			const result = await sut.createSession('user_id');

			expect(result).toEqual({ sessionId: 'session_id' });
			expect(luciaClient.createSession).toHaveBeenCalledWith('user_id', {
				ipAddress: null,
				platform: null,
				userId: 'user_id',
			});
		});
	});

	describe('validateSession', () => {
		test('should throw InvalidSessionError if Authorization header is missing', async () => {
			const { sut } = makeSut();
			const mockRequest = { headers: new Headers() } as Request;

			const promise = sut.validateSession(mockRequest);
			expect(promise).rejects.toThrow(InvalidSessionError);
		});

		test('should throw InvalidSessionError if session ID is invalid', async () => {
			const { sut, luciaClient } = makeSut();
			const mockRequest = {
				headers: new Headers({ Authorization: 'Bearer invalid_token' }),
			} as Request;
			spyOn(luciaClient, 'readBearerToken').mockReturnValueOnce(null);

			const promise = sut.validateSession(mockRequest);
			expect(promise).rejects.toThrow(InvalidSessionError);
		});

		test('should throw InvalidSessionError if session is not found', async () => {
			const { sut, luciaClient } = makeSut();
			const mockRequest = {
				headers: new Headers({ Authorization: 'Bearer valid_token' }),
			} as Request;
			spyOn(luciaClient, 'readBearerToken').mockReturnValueOnce('session_id');
			spyOn(luciaClient, 'validateSession').mockResolvedValueOnce({
				session: null,
				user: null,
			});

			const promise = sut.validateSession(mockRequest);
			expect(promise).rejects.toThrow(InvalidSessionError);
		});

		test('should return session ID and logged user if session is valid', async () => {
			const { sut, luciaClient } = makeSut();
			const mockRequest = {
				headers: new Headers({ Authorization: 'Bearer valid_token' }),
			} as Request;
			const mockUser: UserModel = {
				id: 'any_user_id',
				email: 'any_email',
				firstName: 'any_first_name',
				lastName: 'any_last_name',
				emailVerified: true,
				username: 'any_username',
			};

			spyOn(luciaClient, 'readBearerToken').mockReturnValueOnce('session_id');
			spyOn(luciaClient, 'validateSession').mockResolvedValueOnce({
				session: { id: 'session_id' } as Session,
				user: mockUser as User,
			});

			const result = await sut.validateSession(mockRequest);

			expect(result).toEqual({
				sessionId: 'session_id',
				loggedUser: mockUser,
			});
			expect(luciaClient.readBearerToken).toHaveBeenCalledWith(
				'Bearer valid_token',
			);
			expect(luciaClient.validateSession).toHaveBeenCalledWith('session_id');
		});
	});
});
