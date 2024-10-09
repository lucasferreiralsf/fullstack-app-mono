import { RequestVerificationCodeUsecase } from '../../../src/domain/usecases/request-verification-code';

export class MockRequestVerificationCode
	implements RequestVerificationCodeUsecase
{
	async invoke() {
		return { email: 'any_email' };
	}
}
