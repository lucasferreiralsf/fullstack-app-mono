import { Usecase } from '@gymclub/utils';
import { NotFoundError } from 'elysia';
import { PaymentProviderService } from '../../data/payment/payment-provider-service';
import { UserRepository } from '../../data/user/user-repository';

export class SetPaymentMethod implements Usecase<Params, Result> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly paymentProviderService: PaymentProviderService,
	) {}

	async invoke({ userId }: Params): Promise<Result> {
		const user = await this.userRepository.findAthleteByUserId(userId);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		return this.paymentProviderService.setPaymentMethod(user);
	}
}

interface Params {
	userId: string;
}

interface Result {
	clientSecret: string;
}
