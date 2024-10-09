import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';

export class MockRequestEmailVerificationCode
	implements RequestEmailVerificationCode
{
	private delayTime = 1000;

	async run(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => void resolve(), this.delayTime);
		});
	}
}
