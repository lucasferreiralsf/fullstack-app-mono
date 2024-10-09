import { ResetPassword } from '@/domain/usecases/reset-password';

export class MockResetPassword implements ResetPassword {
	private delayTime = 1000;

	private validResetRequests: Record<string, { email: string }> = {
		'12345': { email: 'john@doe.com' },
		'54321': { email: 'jane@doe.com' },
	};

	async run(token: string, email: string, password: string): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const resetRequest = this.validResetRequests[token];
				if (resetRequest && resetRequest.email === email) {
					resolve();
				} else {
					reject(new Error('Invalid token, email, or old password.'));
				}
			}, this.delayTime);
		});
	}
}
