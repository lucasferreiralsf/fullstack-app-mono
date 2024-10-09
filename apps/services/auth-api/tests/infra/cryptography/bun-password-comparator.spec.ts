import { describe, expect, spyOn, test } from 'bun:test';
import { BunPasswordComparator } from '../../../src/infra/cryptography/bun-password-comparator';

describe('BunPasswordComparator', () => {
	test('should call Bun.password.compare with correct value and return correct result', async () => {
		const sut = new BunPasswordComparator();
		const compareSpy = spyOn(Bun.password, 'verify').mockImplementationOnce(
			() => Promise.resolve(true),
		);

		const isValid = await sut.compare('any_value', 'any_hash');

		expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
		expect(isValid).toBe(true);
	});
});
