import { UserModel } from '../../domain/models/user';

export interface SessionHandler {
	createSession: (userId: string) => Promise<CreateSessionResult>;
	validateSession: (request: Request) => Promise<ValidateSessionResult>;
}

export interface CreateSessionResult {
	sessionId: string;
}

export interface ValidateSessionResult {
	sessionId: string;
	loggedUser: UserModel;
}
