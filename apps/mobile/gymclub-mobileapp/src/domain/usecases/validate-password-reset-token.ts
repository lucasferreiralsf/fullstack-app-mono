export interface ValidatePasswordResetToken {
	run: (token: string, email: string) => Promise<void>;
}
