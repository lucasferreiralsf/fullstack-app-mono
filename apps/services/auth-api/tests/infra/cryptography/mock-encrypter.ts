import { Encrypter } from '../../../src/data/cryptography/encrypter';

export class MockEncrypter implements Encrypter {
	async encrypt(): Promise<string> {
		return 'encrypted_password';
	}
}
