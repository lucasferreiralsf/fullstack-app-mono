export interface RequestEmailVerificationCode {
	run: (email: string) => Promise<void>;
}
