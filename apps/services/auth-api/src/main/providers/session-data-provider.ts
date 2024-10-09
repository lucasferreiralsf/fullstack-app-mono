import Elysia from 'elysia';
import { UserModel } from '../../domain/models/user';
import { SessionHandlerAdapter } from '../adapters/auth/session-handler';

export const SessionDataProvider = new Elysia()
	.use(SessionHandlerAdapter)
	.derive(
		{ as: 'global' },
		async ({
			request,
			sessionHandler,
		}): Promise<{ loggedUser: UserModel; sessionId: string }> =>
			sessionHandler.validateSession(request),
	);
