export interface VerifyCodeInputProps {
	onChange: (verificationCode: string) => void;
	onCodeComplete: (isComplete: boolean) => void;
	errorMessage: string;
}
