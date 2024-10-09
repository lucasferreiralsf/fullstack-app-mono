export interface VerifyCodeViewProps {
	userEmail: string;
	errorMessage: string;
	isLoading: boolean;
	isSubmitting: boolean;
	onCodeSubmit: (verificationCode: string) => void;
	onVerificationCodeRequested: (userEmail: string) => void;
}

export interface VerifyCodeInputRef {
	submitCode: () => void;
	isCodeComplete: () => void;
}
