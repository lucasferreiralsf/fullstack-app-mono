import { PaymentService } from '../../../src/data/payment/payment-service';

export class MockPaymentService implements PaymentService {
	async subscribeAthlete(): Promise<void> {}

	async createCustomer(): Promise<void> {}
}
