import Elysia from 'elysia';
import { requestCodeController } from './request-code.controller';
import { validateCodeController } from './validate-code.controller';

export const emailVerificationController = new Elysia({
	prefix: 'email-verification',
})
	.use(requestCodeController)
	.use(validateCodeController);
