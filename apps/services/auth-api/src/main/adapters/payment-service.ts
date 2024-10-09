import Elysia from 'elysia';
import { makePaymentService } from '../factories/payment-service';

export const PaymentServiceProvider = new Elysia().derive(
	{ as: 'global' },
	async () => ({
		paymentService: makePaymentService(),
	}),
);
