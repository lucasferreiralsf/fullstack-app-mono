import { PasswordComparator } from '../../../src/data/cryptography/password-comparator';

export class MockPasswordComparator implements PasswordComparator {
	async compare(password: string, hash: string): Promise<boolean> {
		return true;
	}
}
