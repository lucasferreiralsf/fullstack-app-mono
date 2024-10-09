import Elysia from 'elysia';
import { emailVerificationController } from './email-verification';
import { passwordResetController } from './password-reset';
import { signInController } from './signin.controller';
import { signUpController } from './signup.controller';

export const authController = new Elysia({ prefix: '/auth' })
	.use(signInController)
	.use(signUpController)
	.use(emailVerificationController)
	.use(passwordResetController);
