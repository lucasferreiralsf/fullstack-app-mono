import { VerificationCodeGenerator } from '../../../src/data/verification-code/verification-code-generator';

export class MockVerificationCodeGenerator
	implements VerificationCodeGenerator
{
	async generate(): Promise<string> {
		return 'any_code';
	}
}
