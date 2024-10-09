import { SignUp } from '../../domain/usecases/signup';
import { DefaultOnboardingService } from '../../infra/onboarding/default-onboarding-service';
import { makeCompanyEmployeeRepository } from './company-employee';
import { makeEncrypter } from './encrypter';
import { makePaymentService } from './payment-service';
import { makeGetVerificationCode } from './request-verification-code';
import { makeSessionHandler } from './session-handler';
import { makeUserRepository } from './user-repository';

export const makeSignUp = (): SignUp => {
	const companyEmployeeRepository = makeCompanyEmployeeRepository();
	const onboardingService = new DefaultOnboardingService(
		companyEmployeeRepository,
	);
	const encrypter = makeEncrypter();
	const sessionHandler = makeSessionHandler();
	const getVerificationCode = makeGetVerificationCode();
	const paymentService = makePaymentService();
	const userRepository = makeUserRepository();

	return new SignUp(
		encrypter,
		sessionHandler,
		getVerificationCode,
		userRepository,
		onboardingService,
		paymentService,
	);
};
