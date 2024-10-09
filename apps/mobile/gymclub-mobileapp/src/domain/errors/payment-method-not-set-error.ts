export class PaymentMethodNotSetError extends Error {
	constructor() {
		super('Payment method not set');
		this.name = 'PaymentMethodNotSetError';
	}
}
