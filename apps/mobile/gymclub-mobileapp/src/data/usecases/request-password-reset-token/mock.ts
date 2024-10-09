import { RequestPasswordResetToken } from '@/domain/usecases/request-password-reset-token';

export class MockRequestPasswordResetToken
	implements RequestPasswordResetToken
{
	private delayTime = 1000;

	async run(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => void resolve(), this.delayTime);
		});
	}
}
