import { EmailClient } from '../../data/email/email-client';
import { VerificationCodeSender } from '../../data/verification-code/verification-code-sender';

export class EmailVerificationCodeSender implements VerificationCodeSender {
	constructor(private readonly emailClient: EmailClient) {}

	sendEmail(code: string, email: string): Promise<void> {
		return this.emailClient.send({
			body: `Your verification code is ${code}. Use it in the appllication to verify your account.`,
			subject: 'Verify your account with GymClub',
			to: email,
		});
	}
}
