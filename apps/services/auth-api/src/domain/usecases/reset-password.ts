import { Usecase } from '@gymclub/utils';
import { Encrypter } from '../../data/cryptography/encrypter';
import { UserRepository } from '../../data/user/user-repository';

export class ResetPassword implements Usecase<Params, Result> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly encrypter: Encrypter,
	) {}

	async invoke({ email, password }: Params): Promise<Result> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			return 'INVALID_EMAIL';
		}

		const hashedPassword = await this.encrypter.encrypt(password);
		await this.userRepository.updatePassword(user.id, hashedPassword);
		return 'SUCCESS';
	}
}

interface Params {
	email: string;
	password: string;
}

type Result = 'INVALID_EMAIL' | 'SUCCESS';
