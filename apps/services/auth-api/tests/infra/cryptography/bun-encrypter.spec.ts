import { describe, expect, spyOn, test } from 'bun:test';
import { BunEncrypter } from '../../../src/infra/cryptography/bun-encrypter';

describe('BunEncrypter', () => {
	test('should call Bun.password.hash with correct value', async () => {
		const sut = new BunEncrypter();
		const hashSpy = spyOn(Bun.password, 'hash');

		await sut.encrypt('any_value');

		expect(hashSpy).toHaveBeenCalledWith('any_value');
	});

	test('should return same value returned from Bun hash method', async () => {
		const sut = new BunEncrypter();
		spyOn(Bun.password, 'hash').mockResolvedValueOnce('any_hash');

		const hash = await sut.encrypt('any_value');

		expect(hash).toBe('any_hash');
	});
});
