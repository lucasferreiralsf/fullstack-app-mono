import { PasswordComparator } from '../../data/cryptography/password-comparator';

export class BunPasswordComparator implements PasswordComparator {
	async compare(password: string, storedPassword: string): Promise<boolean> {
		return Bun.password.verify(password, storedPassword);
	}
}
