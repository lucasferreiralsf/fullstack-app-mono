import { ValidatePasswordResetToken } from '@/domain/usecases/validate-password-reset-token';

export class MockValidatePasswordResetToken
	implements ValidatePasswordResetToken
{
	private delayTime = 1000;

	private validResetTokens: Record<string, string> = {
		resetToken1: 'john@doe.com',
		resetToken2: 'jane@doe.com',
	};

	async run(token: string, email: string): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const associatedEmail = this.validResetTokens[token];
				if (associatedEmail && associatedEmail === email) {
					resolve();
				} else {
					reject(new Error('Invalid password reset token or email.'));
				}
			}, this.delayTime);
		});
	}
}
