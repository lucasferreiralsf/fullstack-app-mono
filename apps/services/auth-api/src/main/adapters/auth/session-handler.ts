import Elysia from 'elysia';
import { makeSessionHandler } from '../../factories/session-handler';

export const SessionHandlerAdapter = new Elysia().derive(
	{ as: 'global' },
	async () => ({
		sessionHandler: makeSessionHandler(),
	}),
);
