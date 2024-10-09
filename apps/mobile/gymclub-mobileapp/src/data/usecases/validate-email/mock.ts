import { ValidateEmail } from '@/domain/usecases/validate-email';

export class MockValidateEmail implements ValidateEmail {
	private delayTime = 1000;

	private validVerificationCodes: Record<string, string> = {
		'12345': 'john@doe.com',
		'54321': 'jane@doe.com',
	};

	async run(verificationCode: string, email: string): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const associatedEmail = this.validVerificationCodes[verificationCode];
				if (associatedEmail && associatedEmail === email) {
					resolve();
				} else {
					reject(new Error('Invalid verification code or email.'));
				}
			}, this.delayTime);
		});
	}
}
