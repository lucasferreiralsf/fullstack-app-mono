import {
	SessionHandler,
	ValidateSessionResult,
} from '../../../src/data/authentication/session-handler';

export class MockSessionHandler implements SessionHandler {
	async createSession(userId: string): Promise<{ sessionId: string }> {
		return { sessionId: 'any_session_id' };
	}

	async validateSession(request: Request): Promise<ValidateSessionResult> {
		return {
			sessionId: '123',
			loggedUser: {
				id: 'any_id',
				email: 'any_email',
				firstName: 'any_first_name',
				lastName: 'any_last_name',
				emailVerified: true,
			},
		};
	}
}
