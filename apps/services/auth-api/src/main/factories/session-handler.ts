import { LuciaSessionHandler } from '../../infra/authentication/lucia-session-handler';
import { lucia } from '../../infra/clients';

export const makeSessionHandler = () => new LuciaSessionHandler(lucia);
