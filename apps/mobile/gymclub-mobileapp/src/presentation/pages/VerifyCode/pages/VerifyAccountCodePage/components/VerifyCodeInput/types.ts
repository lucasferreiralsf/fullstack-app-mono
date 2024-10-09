export interface VerifyCodeInputProps {
	onSubmit: (verificationCode: string) => void;
	onCodeComplete: (isComplete: boolean) => void;
	errorMessage: string;
}
