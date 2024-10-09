import { makeDbClient } from '@gymclub/db';
import { UserRepository } from '../../data/user/user-repository';
import { env } from '../../env';
import { DrizzleUserRepository } from '../../infra/user/drizzle-user-repository';

export const makeUserRepository = (): UserRepository => {
	const dbClient = makeDbClient(env.DB_URL);
	return new DrizzleUserRepository(dbClient);
};
