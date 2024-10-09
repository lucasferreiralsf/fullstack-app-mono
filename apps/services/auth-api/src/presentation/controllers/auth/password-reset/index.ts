import Elysia from 'elysia';
import { changePasswordController } from './change-password.controller';
import { requestPasswordCodeController } from './request-code.controller';
import { validatePasswordCodeController } from './validate-code.controller';

export const passwordResetController = new Elysia({ prefix: 'password-reset' })
	.use(requestPasswordCodeController)
	.use(validatePasswordCodeController)
	.use(changePasswordController);
