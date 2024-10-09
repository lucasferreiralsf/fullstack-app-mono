import { config } from '@dotenvx/dotenvx';
import { z } from 'zod';

config();

export function generateEnv<T extends z.AnyZodObject>(
	schema: T,
	params?: Partial<z.ParseParams>,
): z.infer<T> {
	const rawEnv = Object.fromEntries(
		Object.keys(schema.shape).map((key) => [key, process.env[key]]),
	);
	return schema.parse(rawEnv, params);
}
