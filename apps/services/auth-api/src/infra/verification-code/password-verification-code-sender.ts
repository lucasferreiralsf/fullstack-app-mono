import { EmailClient } from '../../data/email/email-client';
import { VerificationCodeSender } from '../../data/verification-code/verification-code-sender';

export class PasswordVerificationCodeSender implements VerificationCodeSender {
	constructor(private readonly emailClient: EmailClient) {}

	sendEmail(code: string, email: string): Promise<void> {
		return this.emailClient.send({
			body: `Your token to reset your password is ${code}.`,
			subject: 'Reset your password with GymClub',
			to: email,
		});
	}
}
