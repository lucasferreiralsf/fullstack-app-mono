export interface ResetPassword {
	run: (token: string, email: string, password: string) => Promise<void>;
}
