import nodemailer from 'nodemailer';
import { EmailClient, EmailSendParams } from '../../data/email/email-client';
import { env } from '../../env';

const transporter = nodemailer.createTransport({
	auth: {
		pass: env.SMTP_PASSWORD,
		user: env.SMTP_USER,
	},
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_SECURE,
});

export const emailClient: EmailClient = {
	async send({ from = env.SMTP_FROM, body, ...options }: EmailSendParams) {
		await transporter.sendMail({
			from,
			html: body,
			...options,
		});
	},
};
