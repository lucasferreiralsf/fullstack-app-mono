import Elysia from 'elysia';
import { makeSetPaymentMethod } from '../../factories/set-payment-method';

export const SetPaymentMethodProvider = new Elysia().derive(
	{ as: 'global' },
	() => ({
		setPaymentMethod: makeSetPaymentMethod(),
	}),
);
