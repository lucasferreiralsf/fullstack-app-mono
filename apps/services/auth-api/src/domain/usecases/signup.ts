import { ResourceAlreadyExistsError } from '@gymclub/auth-api/utils/custom-errors';
import { Usecase } from '@gymclub/utils';
import { SessionHandler } from '../../data/authentication/session-handler';
import { Encrypter } from '../../data/cryptography/encrypter';
import { OnboardingService } from '../../data/onboarding/onboarding-service';
import { PaymentService } from '../../data/payment/payment-service';
import { UserRepository } from '../../data/user/user-repository';
import { UserAthleteModel } from '../models/user';
import { RequestVerificationCodeUsecase } from './request-verification-code';

export class SignUp implements SignUpUsecase {
	constructor(
		private readonly encrypter: Encrypter,
		private readonly sessionHandler: SessionHandler,
		private readonly requestVerificationCode: RequestVerificationCodeUsecase,
		private readonly userRepository: UserRepository,
		private readonly onboardingService: OnboardingService,
		private readonly paymentService: PaymentService,
	) {}

	async invoke(params: SignUpParams): Promise<SignUpResult> {
		await this.onboardingService.validateUserDocument(
			params.docNumber,
			params.tenantId,
		);

		const passwordHash = await this.encrypter.encrypt(params.password);

		const user = await this.createUserWithProfile(params, passwordHash);

		const [{ sessionId }, { email }] = await Promise.all([
			this.sessionHandler.createSession(user.id),
			this.requestVerificationCode.invoke({
				email: user.email,
			}),
			this.paymentService.createCustomer(user),
		]);

		return {
			sessionId,
			sentTo: email,
		};
	}

	private async createUserWithProfile(
		params: SignUpParams,
		password: string,
	): Promise<UserAthleteModel> {
		try {
			const result = await this.userRepository.createAthlete({
				...params,
				password,
			});
			return result;
		} catch {
			throw new ResourceAlreadyExistsError();
		}
	}
}

export type SignUpUsecase = Usecase<SignUpParams, SignUpResult>;

interface SignUpParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	docNumber: string;
	tenantId: string;
}

interface SignUpResult {
	sentTo?: string;
	sessionId?: string;
}
