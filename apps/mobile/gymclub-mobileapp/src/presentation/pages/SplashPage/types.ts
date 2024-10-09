import { GetAvailablePlans } from '@/domain/usecases/get-available-plans';
import { GetUserInfo } from '@/domain/usecases/get-user-info';
import { GetUserSubscription } from '@/domain/usecases/get-user-subscription';
import { RequestEmailVerificationCode } from '@/domain/usecases/request-email-verification-code';
import { SignOut } from '@/domain/usecases/signout';

export interface SplashPageProps {
	getUserInfo: GetUserInfo;
	getUserSubscription: GetUserSubscription;
	getAvailablePlans: GetAvailablePlans;
	signOut: SignOut;
	requestEmailVerificationCode: RequestEmailVerificationCode;
}
