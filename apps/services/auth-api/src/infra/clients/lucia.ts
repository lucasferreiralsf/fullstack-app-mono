import { session, SessionTable, user, UserTable } from '@gymclub/db';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia, TimeSpan } from 'lucia';
import { env } from '../../env';
import { dbClient } from './db-client';

export const lucia = new Lucia(
	new DrizzlePostgreSQLAdapter(dbClient, session, user),
	{
		getUserAttributes: ({ password, ...attributes }) => ({
			...attributes,
		}),
		sessionCookie: {
			attributes: {
				secure: env.env === 'PRODUCTION', // set `Secure` flag in HTTPS
			},
		},
		sessionExpiresIn: new TimeSpan(env.AUTH_SESSION_EXPIRES_IN, 'm'),
	},
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes
	extends Omit<SessionTable, 'expiresAt' | 'id'> {}
interface DatabaseUserAttributes extends UserTable {}
