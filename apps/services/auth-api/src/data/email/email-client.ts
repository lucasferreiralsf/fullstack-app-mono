export interface EmailClient {
	send: (options: EmailSendParams) => Promise<void>;
}

export interface EmailSendParams {
	from?: string;
	body: string;
	to: string;
	subject: string;
}
