export interface PasswordComparator {
	compare: (password: string, storedHashedPassword: string) => Promise<boolean>;
}
