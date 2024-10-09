import { alphabet, generateRandomString } from 'oslo/crypto';
import { VerificationCodeGenerator } from '../../data/verification-code/verification-code-generator';

export class DefaultVerificationCodeGenerator
	implements VerificationCodeGenerator
{
	constructor(private readonly codeLength: number) {}

	async generate(): Promise<string> {
		return generateRandomString(this.codeLength, alphabet('0-9'));
	}
}
