import { makeDbClient } from '@gymclub/db';
import { env } from '../../env';

export const dbClient = makeDbClient(env.DB_URL);
