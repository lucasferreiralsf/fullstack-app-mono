export interface VerificationCodeSender {
	sendEmail: (code: string, email: string) => Promise<void>;
}
