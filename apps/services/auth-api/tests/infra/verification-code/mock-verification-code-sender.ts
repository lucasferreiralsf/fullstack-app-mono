import { VerificationCodeSender } from '../../../src/data/verification-code/verification-code-sender';

export class MockVerificationCodeSender implements VerificationCodeSender {
	async sendEmail(code: string, email: string): Promise<void> {}
}
