import { GetAvailablePlans } from '@/domain/usecases/get-available-plans';
import { GetUserInfo } from '@/domain/usecases/get-user-info';
import { GetUserSubscription } from '@/domain/usecases/get-user-subscription';
import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';
import { SignIn } from '@/domain/usecases/signin';

export interface SignInPageProps {
	getUserInfo: GetUserInfo;
	getUserSubscription: GetUserSubscription;
	getAvailablePlans: GetAvailablePlans;
	signIn: SignIn;
	requestEmailVerificationCode: RequestEmailVerificationCode;
}
