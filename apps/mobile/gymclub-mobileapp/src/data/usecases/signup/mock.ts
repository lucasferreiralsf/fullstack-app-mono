import { SignUpModel } from '@/domain/models/signup';
import { SignUp, SignUpFormPayload } from '@/domain/usecases/signup';

export class MockRemoteSignUp implements SignUp {
	private delayTime = 1000;

	async run({
		firstName,
		lastName,
		email,
		password,
		docNumber,
		tenantId,
	}: SignUpFormPayload): Promise<SignUpModel | null> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (
					!firstName ||
					!lastName ||
					!email ||
					!password ||
					!docNumber ||
					!tenantId
				) {
					reject(new Error('Payload is invalid.'));
				} else {
					resolve({
						message: 'User logged in succesfully!',
					});
				}
			}, this.delayTime);
		});
	}
}
