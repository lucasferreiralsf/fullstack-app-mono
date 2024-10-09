import { SignInModel } from '@/domain/models/signin';
import { SignIn } from '@/domain/usecases/signin';

export class MockRemoteSignIn implements SignIn {
	private delayTime = 1000;

	run(email: string, password: string): Promise<SignInModel | null> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!email || !password) {
					reject(new Error('Payload is invalid.'));
				} else {
					resolve({
						message: 'User logged in succesfully!',
						sessionId: '1234',
						emailVerified: true,
					});
				}
			}, this.delayTime);
		});
	}
}
