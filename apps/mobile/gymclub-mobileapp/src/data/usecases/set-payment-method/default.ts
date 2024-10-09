import { HttpClient } from '@/data/interfaces/http/http-client';

import {
	SetPaymentMethod,
	SetPaymentMethodResult,
} from '@/domain/usecases/set-payment-method';

export class DefaultSetPaymentMethod implements SetPaymentMethod {
	constructor(private readonly client: HttpClient) {}

	async run(): Promise<SetPaymentMethodResult> {
		const result = await this.client.request<SetPaymentMethodResultDTO>({
			url: '/users/payment-method',
			method: 'post',
		});

		return result.body;
	}
}

interface SetPaymentMethodResultDTO {
	clientSecret: string;
}
