import { RequestPasswordResetToken } from '@/domain/usecases/request-password-reset-token';
import { ValidatePasswordResetToken } from '@/domain/usecases/validate-password-reset-token';

export interface VerifyPasswordCodePageProps {
	validatePasswordResetToken: ValidatePasswordResetToken;
	requestPasswordResetToken: RequestPasswordResetToken;
}
