import { generateEnv } from '@gymclub/utils';
import { z } from 'zod';

const DEFAULT_API_PORT = 3010;
const DEFAULT_AUTH_SESSION_EXPIRES_IN = 30;
const DEFAULT_EMAIL_VERIFICATION_CODE_LENGTH = 6;
const DEFAULT_EMAIL_VERIFICATION_CODE_EXPIRATION_TIME = 15; // IN MINUTES
const DEFAULT_SMTP_PORT = 587;
const DEFAULT_PASSWORD_RESET_TOKEN_SIZE = 6;
const DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_TIME = 120; // IN MINUTES

const envSchema = z.object({
	API_PORT: z.string().or(z.number()).default(DEFAULT_API_PORT),
	AUTH_SESSION_EXPIRES_IN: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_AUTH_SESSION_EXPIRES_IN)),
	DB_URL: z.string().min(1),
	EMAIL_VERIFICATION_CODE_EXPIRATION_TIME: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_EMAIL_VERIFICATION_CODE_EXPIRATION_TIME)),
	EMAIL_VERIFICATION_CODE_LENGTH: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_EMAIL_VERIFICATION_CODE_LENGTH)),
	env: z.string().optional(),
	PASSWORD_RESET_TOKEN_EXPIRATION_TIME: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_TIME)),
	PASSWORD_RESET_TOKEN_SIZE: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_PASSWORD_RESET_TOKEN_SIZE)),
	SMTP_FROM: z.string().optional(),
	SMTP_HOST: z.string().optional(),
	SMTP_PASSWORD: z.string().optional(),
	SMTP_PORT: z
		.string()
		.optional()
		.refine(
			(value) => {
				const n = Number(value);
				return !Number.isNaN(n) && value && value?.length > 0;
			},
			{
				message: 'Value must be a number',
			},
		)
		.transform(Number)
		.default(String(DEFAULT_SMTP_PORT)),
	SMTP_SECURE: z
		.string()
		.optional()
		.refine((value) => value === 'true' || value === 'false', {
			message: 'Value must be a boolean',
		})
		.transform((value) => value === 'true')
		.default('true'),
	SMTP_USER: z.string().optional(),
	STRIPE_SECRET_KEY: z.string().min(1),
	STRIPE_WEBHOOK_SECRET: z.string().min(1),
});

export const env = generateEnv(envSchema);
