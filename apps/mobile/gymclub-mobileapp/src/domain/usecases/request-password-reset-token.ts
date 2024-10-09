export interface RequestPasswordResetToken {
	run: (email: string) => Promise<void>;
}
