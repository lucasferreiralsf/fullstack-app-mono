import Elysia from 'elysia';
import { onErrorMiddleware } from './on-error';

export const middlewares = (app: Elysia) => app.use(onErrorMiddleware);
