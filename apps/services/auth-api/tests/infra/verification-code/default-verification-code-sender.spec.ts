import { describe, expect, spyOn, test } from 'bun:test';
import { EmailVerificationCodeSender } from '../../../src/infra/verification-code/email-verification-code-sender';
import { MockEmailClient } from '../email/mock-email-client';

const makeSut = () => {
	const emailClient = new MockEmailClient();
	const sut = new EmailVerificationCodeSender(emailClient);
	return { sut, emailClient };
};

describe('DefaultVerificationCodeSender', () => {
	test('should call email client with correct values', async () => {
		const { sut, emailClient } = makeSut();
		spyOn(emailClient, 'send');

		await sut.sendEmail('any_code', 'any_email');

		expect(emailClient.send).toHaveBeenCalledWith({
			body: 'Your verification code is any_code. Use it in the appllication to verify your account.',
			subject: 'Verify your account with GymClub',
			to: 'any_email',
		});
	});
});
