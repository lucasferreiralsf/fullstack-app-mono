export interface ValidateEmail {
	run: (verificationCode: string, email: string) => Promise<void>;
}
