import { GetUserInfo } from '@/domain/usecases/get-user-info';
import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';
import { ValidateEmail } from '@/domain/usecases/validate-email';

export interface VerifyAccountCodePageProps {
	requestEmailVerificationCode: RequestEmailVerificationCode;
	validateEmail: ValidateEmail;
	getUserInfo: GetUserInfo;
}
