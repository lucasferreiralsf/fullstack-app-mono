export interface ForgotMyPasswordContextType {
	userEmail: string;
	verificationCode: string;
	setUserEmail: (email: string) => void;
	setVerificationCode: (code: string) => void;
}
