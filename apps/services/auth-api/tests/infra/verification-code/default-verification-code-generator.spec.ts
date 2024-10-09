import { describe, expect, test } from 'bun:test';
import { DefaultVerificationCodeGenerator } from '../../../src/infra/verification-code/default-verification-code-generator';

describe('DefaultVerificationCodeGenerator', () => {
	describe('generate', () => {
		test('should return a 6-digit numeric code', async () => {
			const sut = new DefaultVerificationCodeGenerator(6);
			const code = await sut.generate();
			expect(code).toMatch(/^\d{6}$/);
		});
	});
});
