import { PaymentService } from '../../../src/data/payment/payment-service';

export class MockPaymentService implements PaymentService {
	async createCustomer(): Promise<void> {}

	async subscribeAthlete(): Promise<void> {}
}
