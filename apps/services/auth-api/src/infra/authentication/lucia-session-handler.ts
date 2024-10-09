import { InvalidSessionError } from '@gymclub/auth-api/utils/custom-errors';
import { type Lucia } from 'lucia';
import {
	CreateSessionResult,
	SessionHandler,
} from '../../data/authentication/session-handler';
import { UserModel } from '../../domain/models/user';

export class LuciaSessionHandler implements SessionHandler {
	constructor(private readonly luciaClient: Lucia) {}

	async createSession(userId: string): Promise<CreateSessionResult> {
		const session = await this.luciaClient.createSession(userId, {
			ipAddress: null,
			platform: null,
			userId,
		});
		return { sessionId: session.id };
	}

	async validateSession(request: Request) {
		const authorizationHeader = request.headers.get('Authorization');
		if (!authorizationHeader) {
			throw new InvalidSessionError();
		}

		const sessionId = this.luciaClient.readBearerToken(authorizationHeader);
		if (!sessionId) {
			throw new InvalidSessionError();
		}

		const { session, user } = await this.luciaClient.validateSession(sessionId);
		if (!session?.id) {
			throw new InvalidSessionError();
		}

		return {
			sessionId: session.id,
			loggedUser: user as UserModel,
		};
	}
}
