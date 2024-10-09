import { makeDbClient } from '@gymclub/db';
import { SignIn } from '../../domain/usecases/signin';
import { env } from '../../env';
import { BunPasswordComparator } from '../../infra/cryptography/bun-password-comparator';
import { DrizzleUserRepository } from '../../infra/user/drizzle-user-repository';
import { makeSessionHandler } from './session-handler';

export const makeSignIn = (): SignIn => {
	const dbClient = makeDbClient(env.DB_URL);
	const userRepository = new DrizzleUserRepository(dbClient);
	const sessionHandler = makeSessionHandler();
	const passwordComparator = new BunPasswordComparator();

	return new SignIn(sessionHandler, userRepository, passwordComparator);
};
