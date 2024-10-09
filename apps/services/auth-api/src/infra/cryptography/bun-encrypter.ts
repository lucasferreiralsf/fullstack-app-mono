import { Encrypter } from '../../data/cryptography/encrypter';

export class BunEncrypter implements Encrypter {
	async encrypt(value: string): Promise<string> {
		return Bun.password.hash(value);
	}
}
