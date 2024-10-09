import { HttpClient } from '@/data/interfaces/http/http-client';

import { BadRequestError, PaymentMethodNotSetError } from '@/domain/errors';
import { ChoosePlan, ChoosePlanResult } from '@/domain/usecases/choose-plan';

export class DefaultChoosePlan implements ChoosePlan {
	constructor(private readonly client: HttpClient) {}

	async run(planId: string): Promise<ChoosePlanResult> {
		try {
			const response = await this.client.request<ChoosePlanDto>({
				method: 'patch',
				url: '/users/plan',
				body: { planId },
			});
			return response.body;
		} catch (error) {
			if (error instanceof BadRequestError) {
				throw new PaymentMethodNotSetError();
			}
			throw error;
		}
	}
}

interface ChoosePlanDto {
	clientSecret: string;
}
