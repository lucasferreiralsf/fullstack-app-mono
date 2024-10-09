import { EmailClient } from '../../../src/data/email/email-client';

export class MockEmailClient implements EmailClient {
	async send() {}
}
