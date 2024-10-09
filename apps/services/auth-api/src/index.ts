import Elysia from 'elysia';
import { env } from './env';
import { middlewares } from './main/middlewares';
import { authController } from './presentation/controllers/auth';
import { companiesController } from './presentation/controllers/companies';
import { plansController } from './presentation/controllers/plans/plans.controller';
import { usersController } from './presentation/controllers/users/users.controller';
import { stripeController } from './presentation/stripe.controller';

const app = new Elysia()
	.use(middlewares)
	.use(stripeController)
	.use(authController)
	.use(companiesController)
	.use(plansController)
	.use(usersController)
	.listen(env.API_PORT);

// eslint-disable-next-line no-console
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
