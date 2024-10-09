import { InvalidUsernameOrPasswordError } from '@gymclub/auth-api/utils/custom-errors';
import { Usecase } from '@gymclub/utils';
import { SessionHandler } from '../../data/authentication/session-handler';
import { PasswordComparator } from '../../data/cryptography/password-comparator';
import { UserRepository } from '../../data/user/user-repository';

interface SignInResult {
	sessionId: string;
	emailVerified: boolean;
}

interface SignInParams {
	email: string;
	password: string;
}

export class SignIn implements Usecase<SignInParams, SignInResult> {
	constructor(
		private readonly sessionHandler: SessionHandler,
		private readonly userRepository: UserRepository,
		private readonly passwordComparator: PasswordComparator,
	) {}

	async invoke({ email, password }: SignInParams): Promise<SignInResult> {
		const existingUser =
			await this.userRepository.findUserWithPasswordByEmail(email);
		if (!existingUser) throw new InvalidUsernameOrPasswordError();

		const isPasswordValid = await this.passwordComparator.compare(
			password,
			existingUser.password ?? '',
		);
		if (!isPasswordValid) throw new InvalidUsernameOrPasswordError();

		const { sessionId } = await this.sessionHandler.createSession(
			existingUser.id,
		);
		return {
			sessionId,
			emailVerified: existingUser.emailVerified ?? false,
		};
	}
}
